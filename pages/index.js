import { useState } from "react";

const EXPLAINER = {
  en: (
    <>
      <h2 style={{ color: "#08C6FF", fontWeight: 800, fontSize: "2em", marginBottom: 12 }}>
        About KritRNA
      </h2>
      <p style={{ fontSize: "1.13em", color: "#d1d7e0", lineHeight: 1.75, margin: "0 0 1.8em 0", textAlign: "center" }}>
        Imagine your body is like a giant factory, and proteins are the machines that keep everything running. To build these machines, your body uses instructions from your genes. But sometimes, there’s a mistake in the instructions—a “stop sign” shows up too soon, and the machine is left unfinished.<br /><br />
        tRNA is like a helpful delivery truck that brings the right building blocks to the factory to build each machine. At KritRNA, we’re creating special delivery trucks, called <b>suppressor tRNA</b>, that can recognize when there’s an accidental stop sign and help the factory finish building the machine anyway.<br /><br />
        This technology is especially important because some people are born with **serious genetic diseases caused by these “premature stop signs” in their genes**. Examples include:
        <ul style={{ color: "#d1d7e0", margin: "12px 0 12px 20px", textAlign: "left", fontSize: "1em" }}>
          <li><b>Duchenne muscular dystrophy (DMD):</b> leads to progressive muscle weakness, often fatal in early adulthood</li>
          <li><b>Cystic fibrosis (CF):</b> causes severe lung and digestive problems</li>
          <li><b>Beta thalassemia:</b> leads to life-threatening anemia, requiring frequent blood transfusions</li>
        </ul>
        <b>These are life-ending, genetic diseases present from birth, with no true cure today.</b> Our technology gives patients’ cells a way to finish making the proteins they desperately need, offering hope where there was none.<br /><br />
        <b>Our mission at KritRNA is to use this science to help people around the world live healthier, happier lives!</b>
      </p>
      <div style={{ color: "#ff00b7", fontWeight: 700, margin: "1.2em 0", fontSize: "1.05em" }}>
        To know more or get answers to your own questions,<br />
        use our KritRNA AI Assistant!
      </div>
    </>
  ),
  hi: (
    <>
      <h2 style={{ color: "#08C6FF", fontWeight: 800, fontSize: "2em", marginBottom: 12 }}>
        KritRNA के बारे में
      </h2>
      <p style={{ fontSize: "1.13em", color: "#d1d7e0", lineHeight: 1.75, margin: "0 0 1.8em 0", textAlign: "center" }}>
        कल्पना कीजिए कि आपका शरीर एक बड़ी फैक्ट्री की तरह है, और प्रोटीन वे मशीनें हैं जो सबकुछ चलाती हैं। इन मशीनों को बनाने के लिए आपके शरीर को आपके जीन की निर्देशों की जरूरत होती है। लेकिन कभी-कभी, इन निर्देशों में गलती से एक "रुकावट का संकेत" (स्टॉप साइन) आ जाता है और मशीन अधूरी रह जाती है।<br /><br />
        tRNA एक सहायक डिलीवरी ट्रक की तरह है, जो फैक्ट्री तक सही बिल्डिंग ब्लॉक पहुँचाता है। KritRNA में, हम ऐसे खास डिलीवरी ट्रक बना रहे हैं जिन्हें <b>सप्रेसर tRNA</b> कहते हैं, जो अचानक आए स्टॉप साइन को पहचान सकते हैं और फैक्ट्री को मशीन पूरी करने में मदद करते हैं।<br /><br />
        यह तकनीक विशेष रूप से उन लोगों के लिए महत्वपूर्ण है जो <b>जन्म से ही गंभीर आनुवंशिक बीमारियों के साथ पैदा होते हैं, जिनका कारण इन्हीं "अचानक आए स्टॉप संकेत" हैं</b>। उदाहरण स्वरूप:
        <ul style={{ color: "#d1d7e0", margin: "12px 0 12px 20px", textAlign: "left", fontSize: "1em" }}>
          <li><b>ड्यूचेन मस्कुलर डिस्ट्रॉफी (DMD):</b> मांसपेशियों की कमजोरी, जो अक्सर युवावस्था में जानलेवा हो जाती है</li>
          <li><b>सिस्टिक फाइब्रोसिस (CF):</b> फेफड़ों और पाचन तंत्र में गंभीर समस्याएँ</li>
          <li><b>बीटा थैलेसीमिया:</b> गंभीर खून की कमी, जिसमें बार-बार रक्त चढ़ाने की जरूरत पड़ती है</li>
        </ul>
        <b>ये जीवन समाप्त करने वाली, जन्मजात बीमारियाँ हैं, जिनका आज तक कोई सच्चा इलाज नहीं है।</b> हमारी तकनीक इन मरीजों की कोशिकाओं को वह ज़रूरी प्रोटीन बनाने में मदद करती है, जिससे उन्हें नई उम्मीद मिलती है।<br /><br />
        <b>KritRNA का मिशन है कि हम इस विज्ञान का उपयोग करके दुनिया भर के लोगों को बेहतर और स्वस्थ जीवन दे सकें!</b>
      </p>
      <div style={{ color: "#ff00b7", fontWeight: 700, margin: "1.2em 0", fontSize: "1.05em" }}>
        और अधिक जानने या अपने सवाल पूछने के लिए,<br />
        हमारा KritRNA AI Assistant आज़माएं!
      </div>
    </>
  ),
};


export default function Home() {
  const [lang, setLang] = useState("en");
  return (
    <div style={{
      minHeight: "100vh",
      background: "#15171a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', Arial, sans-serif"
    }}>
      <div style={{
        background: "#181a20",
        padding: "2.5em 2em 1.5em 2em",
        borderRadius: "1.6em",
        boxShadow: "0 8px 36px #0008",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "96%",
        maxWidth: 430,
        marginTop: 60
      }}>
        <img src="/logo.png"
          alt="KritRNA World Logo"
          style={{ height: 82, marginBottom: 20, marginTop: 10, borderRadius: "2em" }} />
        {/* Sanskrit name explanation */}
        <div style={{ color: "#d1d7e0", marginBottom: 6, fontSize: "1.08em", textAlign: "center" }}>
          <b>krit</b> (कृत्, Sanskrit): “engineered”<br />
          <b>tRNA</b>: the cell’s builder molecule
        </div>
        {/* Tagline */}
        <div style={{
          color: "#ff00b7",
          fontWeight: 700,
          fontSize: "1.12em",
          margin: "7px 0 21px 0",
          textAlign: "center",
          letterSpacing: "0.01em"
        }}>
          A Gene Therapy Company
        </div>

        {/* Language toggle buttons */}
        <div style={{ marginBottom: 15 }}>
          <button
            onClick={() => setLang("en")}
            style={{
              background: lang === "en" ? "#08C6FF" : "#222",
              color: "#fff",
              border: "none",
              padding: "0.5em 1.3em",
              borderRadius: "0.7em 0 0 0.7em",
              fontWeight: 700,
              fontSize: "1em",
              cursor: lang === "en" ? "default" : "pointer"
            }}
            disabled={lang === "en"}
          >English</button>
          <button
            onClick={() => setLang("hi")}
            style={{
              background: lang === "hi" ? "#ff00b7" : "#222",
              color: "#fff",
              border: "none",
              padding: "0.5em 1.3em",
              borderRadius: "0 0.7em 0.7em 0",
              fontWeight: 700,
              fontSize: "1em",
              cursor: lang === "hi" ? "default" : "pointer"
            }}
            disabled={lang === "hi"}
          >हिंदी</button>
        </div>
        {/* Explainer */}
        {EXPLAINER[lang]}

        {/* Button to chat page */}
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
            marginTop: "2.1em",
            transition: "background 0.2s"
          }}
        >
          {lang === "en" ? "Try the KritRNA AI Assistant" : "KritRNA AI सहायक आज़माएं"}
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
        © 2025 KritRNA. All rights reserved.
      </footer>
    </div>
  );
}
