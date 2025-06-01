
import React, { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `
You are KritRNA-GPT, an expert assistant for tRNA biology, premature termination codons (PTCs), natural stop codons, and mRNA translation. 
You ONLY answer questions in these fields: tRNA structure/function, suppressor tRNAs, nonsense mutations, codon usage, translation mechanisms, ribosome biology, genetic code, and related molecular biology. 
Refuse all questions outside these topics and politely say you only answer tRNA/PTC/mRNA translation biology.
Always give concise, expert-level, referenced answers.
`;

export default function TrnaChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! Ask me anything about tRNA, stop codons, or mRNA translation biology.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map(({ role, content }) => ({ role, content })),
      userMessage,
    ];

    try {
      const res = await fetch("/api/trna-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      const botMessage =
        data.result ||
        "Sorry, no response (possible API key or usage error).";
      setMessages((msgs) => [...msgs, { role: "assistant", content: botMessage }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Sorry, there was an error with the API." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", fontFamily: "Inter,sans-serif", background: "#fff"
    }}>
      <header style={{
        background: "#08C6FF", color: "#000", padding: "1.2rem", textAlign: "center"
      }}>
        <img src="/logo.png" alt="KritRNA Logo"
             style={{ height: 40, verticalAlign: "middle", marginRight: 12, borderRadius: "0.7em" }} />
        <span style={{ fontSize: 28, fontWeight: "bold" }}>KritRNA-GPT</span>
      </header>
      <main style={{
        maxWidth: 600, margin: "2rem auto", background: "#fff",
        padding: "2rem", borderRadius: 24, boxShadow: "0 8px 36px #0001"
      }}>
        <div ref={chatRef} style={{ marginBottom: 24, minHeight: 240 }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              background: m.role === "assistant" ? "#F7F8FA" : "#08C6FF11",
              color: m.role === "assistant" ? "#111" : "#000",
              padding: "0.8em 1em",
              borderRadius: 16,
              marginBottom: 12,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "90%",
              fontSize: 16
            }}>
              <strong>{m.role === "assistant" ? "KritRNA-GPT: " : "You: "}</strong>
              {m.content}
            </div>
          ))}
          {loading && <div style={{ fontStyle: "italic", color: "#08C6FF" }}>Thinking…</div>}
        </div>
        <form onSubmit={handleSend} style={{ display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about tRNA/stop codon biology…"
            style={{ flex: 1, padding: "0.9em", borderRadius: 18, border: "1px solid #08C6FF", fontSize: 16 }}
            disabled={loading}
            autoFocus
          />
          <button type="submit" style={{
            background: "#FF00B7", color: "#fff", border: "none",
            padding: "0.7em 1.4em", borderRadius: 16, fontWeight: "bold",
            fontSize: 16, cursor: "pointer"
          }} disabled={loading}>Send</button>
        </form>
      </main>
      <footer style={{
        background: "#000", color: "#fff", textAlign: "center",
        padding: "1em", borderTop: "3px solid #FF00B7"
      }}>
        tRNA & PTC Biology Chat &copy; 2025 KritRNA
      </footer>
    </div>
  );
}
