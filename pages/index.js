
export default function Home() {
  return (
    <main style={{
      minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      flexDirection:'column',fontFamily:'Inter,sans-serif',background:'#fff'
    }}>
      <img src="/logo.png" alt="KritRNA Logo" style={{height:100,marginBottom:40,borderRadius:'2em'}} />
      <h1 style={{color:'#08C6FF'}}>Welcome to KritRNA-GPT</h1>
      <p style={{fontSize:'1.2em',maxWidth:480,textAlign:'center',margin:'1.5em auto'}}>
        This site provides an AI-powered assistant for tRNA biology, premature termination codons (PTC), stop codons, and mRNA translation.
      </p>
      <a href="/trna-chat" style={{background:'#FF00B7',color:'#fff',padding:'1em 2em',borderRadius:'1.2em',textDecoration:'none',fontWeight:'bold',fontSize:'1.2em'}}>Try the Chatbot</a>
    </main>
  );
}
