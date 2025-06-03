import React, { useState, useRef, useEffect } from "react";

// Brand colors
const BLUE = "#08C6FF";
const PINK = "#ff00b7";
const DARK = "#15171a";
const LIGHT = "#fff";
const HINT = "#2b2e33";

function getPrompt(hindi) {
  return hindi
    ? `आप KritRNA World हैं, tRNA बायोलॉजी, प्रीमैच्योर टर्मिनेशन कोडॉन (PTCs), स्टॉप कोडॉन और mRNA ट्रांसलेशन में विशेषज्ञ सहायक हैं। कृपया केवल इन्हीं क्षेत्रों से संबंधित प्रश्नों के उत्तर हिंदी में दें, अन्य विषयों पर विनम्रता से मना करें। सभी उत्तर संक्षिप्त, विशेषज्ञ स्तर के और संदर्भों के साथ दें।`
    : `You are KritRNA World, an expert assistant for tRNA biology, premature termination codons (PTCs), stop codons, and mRNA translation. ONLY answer questions in these fields. Refuse others politely. All answers should be concise, expert-level, and referenced.`;
}

export default function TrnaChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! Ask me anything about tRNA biology, stop codons, or mRNA translation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hindi, setHindi] = useState(false);
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current && (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    const apiMessages = [
      { role: "system", content: getPrompt(hindi) },
      ...messages.map(({ role, content }) => ({ role, content })),
      userMessage,
    ];

    try {
      const res = await fetch("/api/trna-gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      const botMessage =
        data.result ||
        (hindi
          ? "क्षमा करें, उत्तर प्राप्त नहीं हुआ (API कुंजी या उपयोग में कोई त्रुटि)।"
          : "Sorry, no response (possible API key or usage error).");
      setMessages((msgs) => [...msgs, { role: "assistant", content: botMessage }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: hindi
            ? "क्षमा करें, एपीआई में कोई त्रुटि हुई।"
            : "Sorry, there was an error with the API.",
        },
      ]);
    }
    setLoading(false);
  };

  // For accessibility: auto-focus input when hindi mode switches
  useEffect(() => {
    document.getElementById("kritrna-chat-input")?.focus();
  }, [hindi]);

  return (
    <div
      style={{
        background: DARK,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, Arial, sans-serif"
      }}
    >
      <header
        style={{
          background: DARK,
          borderBottom: `2.5px solid ${BLUE}`,
          padding: "1.05em 0 1em 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <img src="/logo.png" alt="KritRNA World Logo"
          style={{ height: 44, marginRight: 16, borderRadius: "1.2em" }} />
        <span style={{
          fontSize: 28,
          fontWeight: 900,
          color: BLUE,
          letterSpacing: "0.01em"
        }}>KritRNA World</span>
        <button
          onClick={() => setHindi((h) => !h)}
          style={{
            marginLeft: 22,
            background: hindi ? BLUE : PINK,
            color: "#fff",
            border: "none",
            borderRadius: "0.7em",
            padding: "0.47em 1.13em",
            fontWeight: 700,
            fontSize: "1em",
            boxShadow: `0 2px 10px ${hindi ? BLUE : PINK}33`,
            cursor: "pointer",
            transition: "background 0.18s"
          }}
          title={hindi ? "Switch to English" : "हिंदी में उत्तर पाने के लिए क्लिक करें"}
        >
          {hindi ? "Switch to English" : "हिंदी में पूछें"}
        </button>
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          background: DARK,
        }}
      >
        <div style={{
          flex: 1,
          maxWidth: 600,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#17191d",
          margin: "2em 0 1em 0",
          borderRadius: 18,
          boxShadow: "0 6px 32px #0008",
          minHeight: 540,
          position: "relative"
        }}>
          <div
            ref={chatRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "2em 1.2em 1em 1.2em",
              marginBottom: 82,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 20,
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    background: m.role === "assistant" ? "#fff" : "#181f2a",
                    color: "#181f2a",
                    borderRadius: "1.1em",
                    padding: "1.07em 1.5em",
                    maxWidth: "90%",
                    fontSize: "1.15em",
                    boxShadow: m.role === "user"
                      ? `0 2px 12px ${BLUE}12`
                      : "0 1px 8px #1112",
                    border: m.role === "user"
                      ? `1.8px solid ${BLUE}`
                      : "1.6px solid #eee",
                    textAlign: "left",
                    fontWeight: m.role === "assistant" ? 500 : 600,
                    color: m.role === "assistant" ? "#181f2a" : "#fff",
                    backgroundColor: m.role === "assistant" ? "#fff" : "#1d2233"
                  }}
                >
                  <span style={{ color: m.role === "assistant" ? BLUE : BLUE, fontWeight: 700 }}>
                    {m.role === "assistant" ? (hindi ? "KritRNA उत्तर:" : "KritRNA World:") : (hindi ? "आप:" : "You:")}
                  </span>{" "}
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{
                fontStyle: "italic",
                color: BLUE,
                marginTop: 14,
                marginLeft: 6
              }}>
                {hindi ? "सोच रहे हैं…" : "Thinking…"}
              </div>
            )}
          </div>
          <form
            onSubmit={handleSend}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "#181a20",
              borderTop: `1.7px solid ${BLUE}33`,
              display: "flex",
              alignItems: "center",
              padding: "1.05em 1.2em"
            }}
          >
            <input
              id="kritrna-chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={hindi ? "tRNA/स्टॉप कोडॉन बायोलॉजी में पूछें…" : "Ask about tRNA, stop codons, or mRNA translation…"}
              disabled={loading}
              autoFocus
              style={{
                flex: 1,
                padding: "1.1em",
                borderRadius: 16,
                border: `2px solid ${BLUE}`,
                fontSize: 17,
                outline: "none",
                marginRight: 16,
                background: "#242731",
                color: "#fff",
                boxShadow: "none",
                transition: "border 0.15s"
              }}
            />
            <button
              type="submit"
              style={{
                background: PINK,
                color: "#fff",
                border: "none",
                padding: "1em 2.1em",
                borderRadius: "1em",
                fontWeight: "bold",
                fontSize: "1.08em",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                boxShadow: `0 2px 10px ${PINK}18`,
                opacity: loading || !input.trim() ? 0.68 : 1
              }}
              disabled={loading || !input.trim()}
            >
              {hindi ? "भेजें" : "Send"}
            </button>
          </form>
        </div>
      </main>
      <footer style={{
        background: "#181a20",
        color: "#fff",
        textAlign: "center",
        padding: "1.1em 0 0.9em 0",
        fontSize: "1.07em",
        fontWeight: 500,
        borderTop: `2px solid ${BLUE}`
      }}>
        © 2025 KritRNA Biotechnologies Private Limited. All rights reserved.
      </footer>
    </div>
  );
}
