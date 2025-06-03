export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#15171a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <div style={{
        background: "#181a20",
        padding: "2.5em 2em 1.5em 2em",
        borderRadius: "1.6em",
        boxShadow: "0 8px 36px #0008",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        maxWidth: 410,
        marginTop: 60
      }}>
        <img src="/logo.png"
             alt="KritRNA World Logo"
             style={{ height: 90, marginBottom: 32, marginTop: 12, borderRadius: "2em" }} />
        <h1 style={{
          color: "#08C6FF",
          marginBottom: 10,
          fontWeight: 800,
          fontSize: "2.3em",
          letterSpacing: "0.01em",
          textAlign: "center"
        }}>
          Welcome to KritRNA World
        </h1>
        <p style={{
          fontSize: "1.12em",
          color: "#d1d7e0",
          lineHeight: 1.6,
          margin: "0 0 2.1em 0",
          textAlign: "center"
        }}>
          Your portal for tRNA biology, premature termination codons (PTCs), stop codons, and mRNA translation expertise.<br /><br />
          Switch to <span style={{color:"#ff00b7",fontWeight:700}}>Hindi</span> mode in the chatbot for a full Hindi experience!
        </p>
        <a href="/trna-chat"
          style={{
            background: "#ff00b7",
            color: "#fff",
            padding: "1em 2em",
            borderRadius: "1.1em",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.15em",
            boxShadow: "0 4px 16px #ff00b71a",
            transition: "background 0.2s"
          }}
        >
          Try the Chatbot
        </a>
      </div>
      <footer style={{
        marginTop: "auto",
        padding: "1.6em 0 1em 0",
        width: "100%",
        background: "#181a20",
        textAlign: "center",
        color: "#fff",
        fontSize: "1.1em",
        fontWeight: 500,
        borderTop: "2px solid #08C6FF",
        letterSpacing: "0.01em"
      }}>
        © 2025 KritRNA Biotechnologies Private Limited. All rights reserved.
      </footer>
    </div>
  );
}
