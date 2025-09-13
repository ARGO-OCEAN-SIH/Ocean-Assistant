# oceanassistantbackend/consumers.py
import os
import uuid
import json
import base64
import asyncio
import logging
import tempfile
import subprocess

from channels.generic.websocket import AsyncWebsocketConsumer

# Import whisper once (lazy load the model later to avoid startup lag)
import whisper

logger = logging.getLogger(__name__)
_whisper_model = None


async def get_whisper_model():
    global _whisper_model
    if _whisper_model is None:
        loop = asyncio.get_event_loop()
        _whisper_model = await loop.run_in_executor(None, whisper.load_model, "base")
        logger.info("Whisper model loaded.")
    return _whisper_model


class AudioConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.streaming = False
        self.file_suffix = ".webm"
        tmpdir = tempfile.gettempdir()
        self.temp_file_path = os.path.join(tmpdir, f"audio_{uuid.uuid4().hex}{self.file_suffix}")
        open(self.temp_file_path, "wb").close()
        logger.info(f"[AudioConsumer] Connected. temp_file={self.temp_file_path}")
        await self.send_json({"message": "connected"})

    async def disconnect(self, close_code):
        logger.info(f"[AudioConsumer] Disconnect code={close_code}, streaming={self.streaming}")
        if self.streaming:
            self.streaming = False
            try:
                await self._transcribe_and_send(self.temp_file_path)
            except Exception as e:
                logger.exception("Transcription failed on disconnect.")
                await self.safe_send_json({"status": "error", "detail": str(e)})
        try:
            if os.path.exists(self.temp_file_path):
                os.remove(self.temp_file_path)
        except Exception:
            pass

    async def receive(self, text_data=None, bytes_data=None):
        if text_data:
            try:
                data = json.loads(text_data)
            except json.JSONDecodeError:
                await self.send_json({"error": "invalid_json"})
                return

            action = data.get("action")

            if action == "start_stream":
                fmt = data.get("format")
                if fmt:
                    self.file_suffix = "." + fmt.lstrip(".")
                    tmpdir = tempfile.gettempdir()
                    self.temp_file_path = os.path.join(tmpdir, f"audio_{uuid.uuid4().hex}{self.file_suffix}")
                    open(self.temp_file_path, "wb").close()
                    logger.info(f"[AudioConsumer] start_stream → {self.temp_file_path}")
                self.streaming = True
                await self.send_json({"status": "streaming_started"})
                return

            if action == "stop_stream":
                self.streaming = False
                await self.send_json({"status": "streaming_stopped", "message": "Transcribing..."})
                try:
                    await self._transcribe_and_send(self.temp_file_path)
                except Exception as e:
                    logger.exception("Transcription failed.")
                    await self.send_json({"status": "transcription_error", "detail": str(e)})
                return

            if "audio_data" in data:  # base64 audio (not used in your JS right now)
                try:
                    audio_bytes = base64.b64decode(data["audio_data"])
                    await asyncio.to_thread(self._sync_append, audio_bytes)
                except Exception:
                    await self.send_json({"error": "bad_base64"})
                return

        if bytes_data:
            print(f"📦 Received chunk of size {len(bytes_data)} bytes")
            await asyncio.to_thread(self._sync_append, bytes_data)
            return


    def _sync_append(self, data: bytes):
        try:
            with open(self.temp_file_path, "ab") as f:
                f.write(data)
                f.flush()
                os.fsync(f.fileno())
        except Exception as e:
            logger.exception("Failed to append chunk")

    async def _transcribe_and_send(self, file_path: str):
        if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
            await self.send_json({"status": "no_audio"})
            return

        # Convert WebM → WAV (so Whisper can parse reliably)
        wav_path = file_path.rsplit(".", 1)[0] + ".wav"
        try:
            cmd = ["ffmpeg", "-y", "-i", file_path, "-ar", "16000", "-ac", "1", wav_path]
            subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            logger.info(f"[AudioConsumer] Converted {file_path} → {wav_path}")
        except Exception as e:
            logger.exception("ffmpeg conversion failed")
            await self.send_json({"status": "conversion_error", "detail": str(e)})
            return

        try:
            model = await get_whisper_model()
            result = await asyncio.to_thread(model.transcribe, wav_path)
            text = result.get("text", "").strip()
            await self.send_json({"status": "transcription", "text": text})
        except Exception as e:
            logger.exception("Whisper transcription failed")
            await self.send_json({"status": "transcription_error", "detail": str(e)})
        finally:
            for p in (file_path, wav_path):
                try:
                    if os.path.exists(p):
                        os.remove(p)
                except Exception:
                    pass

    async def send_json(self, data: dict):
        await self.send(text_data=json.dumps(data))

    async def safe_send_json(self, data: dict):
        try:
            await self.send_json(data)
        except Exception:
            pass

# # oceanassistantbackend/consumers.py
# import os
# import uuid
# import json
# import base64
# import asyncio
# import logging
# import tempfile
# import importlib
# from channels.generic.websocket import AsyncWebsocketConsumer

# # ---------------------
# # Whisper import attempt
# # ---------------------
# # We try to import whisper at module import time so it's explicit.
# # If it's not installed, we keep a marker and raise a clear error later when transcription is requested.
# try:
#     import whisper  # type: ignore
#     WHISPER_IMPORT_ERROR = None
# except Exception as e:
#     whisper = None  # will attempt dynamic import later in get_whisper_model()
#     WHISPER_IMPORT_ERROR = e

# # Model config
# WHISPER_MODEL_NAME = "base"  # change to "tiny" or "small" for faster CPU performance
# _MODEL = None  # cached whisper model instance

# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO)


# async def get_whisper_model():
#     """
#     Return cached whisper model. If not available, try to import and load it
#     inside a thread (so we don't block the event loop).
#     Raises a RuntimeError with helpful instructions if whisper/ffmpeg missing.
#     """
#     global _MODEL, whisper
#     if _MODEL is not None:
#         return _MODEL

#     # If module import previously failed, try to import now and provide a helpful error if it fails.
#     if whisper is None:
#         try:
#             whisper = importlib.import_module("whisper")
#         except Exception as e:
#             raise RuntimeError(
#                 "Whisper is not installed or failed to import. "
#                 "Install with `pip install -U openai-whisper` and ensure ffmpeg is available on PATH. "
#                 f"Original error: {e}"
#             )

#     # Load model in a thread (blocking operation)
#     try:
#         _MODEL = await asyncio.to_thread(whisper.load_model, WHISPER_MODEL_NAME)
#         logger.info(f"Whisper model '{WHISPER_MODEL_NAME}' loaded.")
#         return _MODEL
#     except Exception as e:
#         raise RuntimeError(f"Failed to load Whisper model '{WHISPER_MODEL_NAME}': {e}")

# # class AudioConsumer(AsyncWebsocketConsumer):
# #     async def connect(self):
# #         await self.accept()
# #         await self.send(text_data=json.dumps({"message": "Connected!"}))

# #     async def receive(self, text_data=None, bytes_data=None):
# #         await self.send(text_data=json.dumps({"echo": text_data or "binary received"}))

# class AudioConsumer(AsyncWebsocketConsumer):
#     """
#     WebSocket consumer:
#       - Accepts text commands: {"action": "start_stream", "format":"webm"} / {"action":"stop_stream"}
#       - Accepts audio either as binary frames (bytes_data) or JSON with base64 'audio_data'
#       - Appends chunks to a per-connection temp file
#       - On stop_stream (or disconnect while streaming) runs Whisper transcription in a background thread
#       - Sends transcription result back to client as JSON
#     """

#     async def connect(self):
#         await self.accept()
#         self.streaming = False
#         self.file_suffix = ".webm"  # default; MediaRecorder often uses webm/ogg
#         tmpdir = tempfile.gettempdir()
#         self.temp_file_path = os.path.join(tmpdir, f"audio_{uuid.uuid4().hex}{self.file_suffix}")
#         # create empty file
#         open(self.temp_file_path, "wb").close()
#         logger.info(f"[AudioConsumer] Connected. temp_file={self.temp_file_path}")
#         await self.send_json({"message": "connected", "temp_file": os.path.basename(self.temp_file_path)})

#     async def disconnect(self, close_code):
#         logger.info(f"[AudioConsumer] Disconnect (code={close_code}). streaming={self.streaming}")
#         # If streaming was active, try to transcribe the captured audio.
#         if self.streaming:
#             self.streaming = False
#             try:
#                 await self._transcribe_and_send(self.temp_file_path)
#             except Exception as e:
#                 logger.exception("Transcription failed on disconnect.")
#                 try:
#                     await self.send_json({"status": "transcription_error", "detail": str(e)})
#                 except Exception:
#                     pass
#         # Clean up temp file
#         try:
#             if os.path.exists(self.temp_file_path):
#                 os.remove(self.temp_file_path)
#         except Exception:
#             pass

#     async def receive(self, text_data=None, bytes_data=None):
#         """
#         Handle incoming websocket messages:
#           - text_data: JSON commands or {"audio_data": "<base64>"} chunks
#           - bytes_data: raw binary audio chunks (blobs)
#         """

#         # Handle text messages (JSON)
#         if text_data:
#             try:
#                 data = json.loads(text_data)
#             except json.JSONDecodeError:
#                 await self.send_json({"error": "invalid_json"})
#                 return

#             action = data.get("action")
#             if action == "start_stream":
#                 fmt = data.get("format")
#                 if fmt:
#                     # update suffix and recreate temp file (unique per start)
#                     self.file_suffix = "." + fmt.lstrip(".")
#                     tmpdir = tempfile.gettempdir()
#                     self.temp_file_path = os.path.join(tmpdir, f"audio_{uuid.uuid4().hex}{self.file_suffix}")
#                     open(self.temp_file_path, "wb").close()
#                     logger.info(f"[AudioConsumer] start_stream: new temp_file={self.temp_file_path}")
#                 self.streaming = True
#                 await self.send_json({"status": "streaming_started"})
#                 return

#             elif action == "stop_stream":
#                 # stop streaming and transcribe
#                 self.streaming = False
#                 await self.send_json({"status": "streaming_stopped", "message": "Transcribing..."})
#                 try:
#                     await self._transcribe_and_send(self.temp_file_path)
#                 except Exception as e:
#                     logger.exception("Transcription failed during stop_stream.")
#                     await self.send_json({"status": "transcription_error", "detail": str(e)})
#                 finally:
#                     # cleanup
#                     try:
#                         if os.path.exists(self.temp_file_path):
#                             os.remove(self.temp_file_path)
#                     except Exception:
#                         pass
#                 return

#             # base64 audio chunk
#             if "audio_data" in data:
#                 audio_b64 = data["audio_data"]
#                 try:
#                     audio_bytes = base64.b64decode(audio_b64)
#                 except Exception:
#                     await self.send_json({"error": "bad_base64"})
#                     return
#                 await asyncio.to_thread(self._sync_append, audio_bytes)
#                 await self.send_json({"status": "chunk_received", "size": len(audio_bytes)})
#                 return

#             # unknown command
#             await self.send_json({"status": "unknown_command", "received_keys": list(data.keys())})
#             return

#         # Handle binary frames (raw audio)
#         if bytes_data:
#             # append to file in thread
#             await asyncio.to_thread(self._sync_append, bytes_data)
#             await self.send_json({"status": "binary_chunk_received", "size": len(bytes_data)})
#             return

#     def _sync_append(self, data: bytes):
#         """Sync helper that appends bytes to the temp file (safe to call from a thread)."""
#         try:
#             dirpath = os.path.dirname(self.temp_file_path)
#             os.makedirs(dirpath, exist_ok=True)
#             with open(self.temp_file_path, "ab") as f:
#                 f.write(data)
#         except Exception:
#             logger.exception("Failed to append audio chunk to temp file.")

#     async def _transcribe_and_send(self, file_path: str):
#         """
#         Run Whisper transcription in a background thread and send back the result.
#         """
#         if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
#             await self.send_json({"status": "no_audio", "message": "No audio to transcribe."})
#             return

#         # Ensure whisper model is available (loads model if necessary)
#         try:
#             model = await get_whisper_model()
#         except Exception as e:
#             logger.exception("Whisper model load error.")
#             await self.send_json({"status": "model_load_error", "detail": str(e)})
#             return

#         # Run transcription in a thread (blocking)
#         try:
#             result = await asyncio.to_thread(model.transcribe, file_path)
#             text = result.get("text", "")
#             await self.send_json({"status": "transcription", "text": text})
#         except Exception as e:
#             logger.exception("Whisper transcription failed.")
#             await self.send_json({"status": "transcription_error", "detail": str(e)})
#         finally:
#             # remove file
#             try:
#                 if os.path.exists(file_path):
#                     os.remove(file_path)
#             except Exception:
#                 pass

#     async def send_json(self, data: dict):
#         """Helper to send dict as JSON text_data over websocket."""
#         await self.send(text_data=json.dumps(data))
