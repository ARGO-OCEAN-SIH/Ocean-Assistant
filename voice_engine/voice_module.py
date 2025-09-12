# voice_module.py
import speech_recognition as sr
import pyttsx3
import time

class SimpleSpeechRecognizer:
    def __init__(self, wake_word="hey ocean"):
        self.recognizer = sr.Recognizer()  # created an object for the recognizer
        self.tts = pyttsx3.init()  # created an object for the text to speech
        self.tts.setProperty('rate', 180)  # setting up the property
        self.wake_word = wake_word.lower()  # store the wake word
        self.is_awake = False  # track if wake word has been detected
        self.is_running = False  # track if recognizer loop is running
        
        # Optimized parameters for better accuracy
        self.setup_optimized_parameters()
    
    def setup_optimized_parameters(self):
        """Set parameters optimized for speech recognition"""
        self.recognizer.energy_threshold = 400
        self.recognizer.pause_threshold = 1.0
        self.recognizer.dynamic_energy_threshold = True
        self.recognizer.phrase_time_limit = 8
    
    def calibrate_microphone(self, source):
        """Calibrate for current environment noise"""
        print("🔧 Calibrating microphone for ambient noise...")
        try:
            self.recognizer.adjust_for_ambient_noise(source, duration=5)
            print(f"✅ Energy threshold set to: {self.recognizer.energy_threshold}")
            return True
        except Exception as e:
            print(f"❌ Calibration failed: {e}")
            return False
    
    def listen_clearly(self, source, timeout=5):
        """Listen with optimized settings"""
        try:
            if self.is_awake:
                print("🎤 Listening for command...")
            else:
                print("🔍 Listening for wake word...")
            
            audio = self.recognizer.listen(
                source,
                timeout=timeout,
                phrase_time_limit=8
            )
            return audio
        except sr.WaitTimeoutError:
            if self.is_awake:
                print("⏰ No command detected within timeout")
                self.is_awake = False
                self.tts.say("Going back to sleep. Say hey ocean to wake me up.")
                self.tts.runAndWait()
            else:
                print("⏰ No wake word detected")
            return None
        except Exception as e:
            print(f"❌ Listening error: {e}")
            return None
    
    def recognize_with_fallback(self, audio):
        """Try recognition with multiple approaches"""
        try:
            text = self.recognizer.recognize_google(audio)
            return text, "success"
        except sr.UnknownValueError:
            return "Could not understand audio", "unclear"
        except sr.RequestError as e:
            return f"API error: {e}", "api_error"
    
    def check_wake_word(self, text):
        """Check if the wake word is present in the recognized text"""
        text_lower = text.lower()
        wake_variations = [
            self.wake_word,
            self.wake_word.replace(" ", ""),
            "okay " + self.wake_word,
            "ok " + self.wake_word,
            "hello " + self.wake_word,
        ]
        for variation in wake_variations:
            if variation in text_lower:
                return True
        return False
    
    def handle_wake_word(self):
        """Handle wake word detection"""
        print(f"✅ Wake word '{self.wake_word}' detected!")
        self.is_awake = True
        self.tts.say("Always there for you sir! How can I help you today?")
        self.tts.runAndWait()
    
    def handle_command(self, text):
        """Handle user commands after wake word"""
        print(f"🎯 Command received: '{text}'")
        if any(word in text.lower() for word in ['temperature', 'temp']):
            self.tts.say("I'll show you ocean temperature data.")
        elif any(word in text.lower() for word in ['salinity', 'salt']):
            self.tts.say("Displaying salinity information.")
        elif any(word in text.lower() for word in ['map', 'location']):
            self.tts.say("Showing ocean map data.")
        else:
            self.tts.say(f"I heard: {text}")
        self.tts.runAndWait()
    
    def provide_feedback(self, text, status):
        """Give appropriate feedback"""
        if status == "success":
            if not self.is_awake and self.check_wake_word(text):
                self.handle_wake_word()
            elif self.is_awake:
                self.handle_command(text)
            else:
                print(f"❓ Heard: '{text}' but waiting for wake word")
        elif status == "unclear":
            print("❌ Could not understand the speech")
            if self.is_awake:
                self.tts.say("Sorry, I didn't understand that. Please try again.")
                self.tts.runAndWait()
        elif status == "api_error":
            print("❌ Network/API issue")
            if self.is_awake:
                self.tts.say("Network connection issue. Please check your internet.")
                self.tts.runAndWait()
    
    def run(self):
        """Main recognition loop"""
        self.is_running = True
        print("=== OCEAN VOICE ASSISTANT ===")
        print(f"Wake word: '{self.wake_word}'")
        print("Press Ctrl+C to stop\n")
        
        with sr.Microphone() as source:
            if not self.calibrate_microphone(source):
                print("⚠️  Using default settings")
            self.tts.say(f"Ocean assistant ready. Say {self.wake_word} to wake me up.")
            self.tts.runAndWait()
            
            while self.is_running:
                try:
                    print("\n" + "="*50)
                    timeout = 5 if self.is_awake else 10
                    audio = self.listen_clearly(source, timeout)
                    if audio is None:
                        continue
                    text, status = self.recognize_with_fallback(audio)
                    self.provide_feedback(text, status)
                    if (self.is_awake and status == "success" and 
                        any(word in text.lower() for word in ['exit', 'quit', 'stop', 'goodbye', 'sleep'])):
                        self.tts.say("Goodbye! Going to sleep.")
                        self.tts.runAndWait()
                        self.is_awake = False
                except KeyboardInterrupt:
                    print("\n🛑 Stopped by user")
                    break
                except Exception as e:
                    print(f"💥 Unexpected error: {e}")
                    if self.is_awake:
                        self.tts.say("System error occurred. Restarting.")
                        self.tts.runAndWait()
                    time.sleep(1)

# Allows safe import without running
if __name__ == "__main__":
    recognizer = SimpleSpeechRecognizer(wake_word="hey ocean")
    recognizer.run()
