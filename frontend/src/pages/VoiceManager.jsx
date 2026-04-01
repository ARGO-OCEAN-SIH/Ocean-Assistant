import { useState, useEffect, useRef } from "react";
import { ReactMic } from "react-mic";

// ─── Waveform bars (static decorative — swap with live data if needed) ────────
const BARS = [8, 18, 28, 22, 12, 20, 30, 16, 8];

function WaveformBar({ height }) {
  return (
    <div
      style={{
        width: 3,
        height,
        borderRadius: 2,
        background: "#5b5bd6",
        opacity: 0.3 + height / 50,
        transition: "height 0.2s ease",
      }}
    />
  );
}

function AnimatedWave({ active }) {
  const [heights, setHeights] = useState(BARS);

  useEffect(() => {
    if (!active) {
      setHeights(BARS);
      return;
    }
    const id = setInterval(() => {
      setHeights(BARS.map((b) => b * (0.5 + Math.random())));
    }, 120);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        height: 40,
        marginBottom: 28,
      }}
    >
      {heights.map((h, i) => (
        <WaveformBar key={i} height={Math.round(Math.min(h, 40))} />
      ))}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function MicIcon({ size = 24, color = "#e0e0e0" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="11" rx="3" fill={color} />
      <path
        d="M5 11a7 7 0 0 0 14 0"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line x1="12" y1="18" x2="12" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="22" x2="15" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="#fff" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.5" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke="#888"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 3v5h5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7v5l4 2" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ listening }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 24px 14px",
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "0.06em",
          opacity: 0.9,
        }}
      >
        Ocean Assistant
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: listening ? "#e24b4a" : "#3fcf8e",
            display: "inline-block",
            transition: "background 0.3s",
          }}
        />
        <span
          style={{
            fontSize: 12,
            color: listening ? "#e24b4a" : "#3fcf8e",
            transition: "color 0.3s",
          }}
        >
          {listening ? "listening" : "ready"}
        </span>
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VoiceManager({
  listening,
  startListening,
  stopListening,
  transcript,
  response,
}) {
  const styles = {
    // Outer shell
    shell: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#080809",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "1rem",
    },

    // Card
    card: {
      background: "#0d0d0f",
      borderRadius: 24,
      width: "100%",
      maxWidth: 400,
      overflow: "hidden",
      border: "0.5px solid rgba(255,255,255,0.08)",
    },

    body: {
      padding: "0 24px 28px",
    },

    // Avatar ring
    avatarRing: {
      width: 88,
      height: 88,
      borderRadius: "50%",
      border: `1.5px solid rgba(255,255,255,${listening ? "0.2" : "0.1"})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "24px auto 28px",
      transition: "border-color 0.4s, box-shadow 0.4s",
      boxShadow: listening ? "0 0 0 6px rgba(91,91,214,0.12)" : "none",
    },

    avatarInner: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: listening ? "#1e1e2e" : "#1a1a1f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.3s",
    },

    // Text boxes
    box: {
      background: "#18181c",
      borderRadius: 12,
      padding: "13px 16px",
      marginBottom: 10,
      minHeight: 56,
    },

    boxLabel: {
      fontSize: 10,
      color: "#444",
      letterSpacing: "0.1em",
      marginBottom: 5,
    },

    transcriptText: {
      fontSize: 14,
      color: "#d0d0d0",
      lineHeight: 1.55,
    },

    responseText: {
      fontSize: 14,
      color: "#8b8bff",
      lineHeight: 1.55,
    },

    // ReactMic hidden wrapper
    micWrapper: {
      width: 0,
      height: 0,
      overflow: "hidden",
      position: "absolute",
    },

    // Button row
    btnRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginTop: 24,
    },

    btnMain: {
      width: 62,
      height: 62,
      borderRadius: "50%",
      background: listening ? "#a32d2d" : "#5b5bd6",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.3s, transform 0.1s",
    },

    btnSide: {
      width: 42,
      height: 42,
      borderRadius: "50%",
      background: "#1e1e22",
      border: "0.5px solid rgba(255,255,255,0.09)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    // Footer
    footer: {
      padding: "13px 24px",
      borderTop: "0.5px solid rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    footerText: {
      fontSize: 11,
      color: "#333",
      letterSpacing: "0.04em",
    },
  };

  return (
    <div style={styles.shell}>
      <div style={styles.card}>
        {/* Navbar */}
        <Navbar listening={listening} />

        <div style={styles.body}>
          {/* Avatar */}
          <div style={styles.avatarRing}>
            <div style={styles.avatarInner}>
              <MicIcon size={26} color={listening ? "#a0a0ff" : "#888"} />
            </div>
          </div>

          {/* Animated waveform */}
          <AnimatedWave active={listening} />

          {/* Hidden ReactMic (still records audio) */}
          <div style={styles.micWrapper}>
            <ReactMic
              record={listening}
              strokeColor="#5b5bd6"
              backgroundColor="transparent"
            />
          </div>

          {/* Transcript */}
          <div style={styles.box}>
            <div style={styles.boxLabel}>YOU</div>
            <div style={styles.transcriptText}>
              {transcript || "Tap the mic and say something…"}
            </div>
          </div>

          {/* Response */}
          <div style={styles.box}>
            <div style={styles.boxLabel}>ASSISTANT</div>
            <div style={styles.responseText}>
              {response || "AI response will appear here…"}
            </div>
          </div>

          {/* Controls */}
          <div style={styles.btnRow}>
            <button
              style={styles.btnSide}
              title="History"
              onClick={() => {}}
              aria-label="History"
            >
              <HistoryIcon />
            </button>

            <button
              style={styles.btnMain}
              onClick={listening ? stopListening : startListening}
              aria-label={listening ? "Stop listening" : "Start listening"}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.93)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {listening ? <StopIcon /> : <MicIcon size={22} color="#fff" />}
            </button>

            <button
              style={styles.btnSide}
              title="Settings"
              onClick={() => {}}
              aria-label="Settings"
            >
              <SettingsIcon />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={styles.footerText}>powered by ARGO &amp; AI</span>
        </div>
      </div>
    </div>
  );
}
