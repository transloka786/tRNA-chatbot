
import Chat from '../components/Chat';

export default function Page() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <div className="title">Ask <span style={{color:'var(--accent)'}}>KritRNA</span></div>
          <div className="subtitle">Get answers about our technology, research, or partnership opportunities.</div>
        </div>
      </header>

      <section className="grid">
        <a className="card" data-variant="public" href="#chat" onClick={(e)=>{e.preventDefault(); const el=document.getElementById('q'); if(el) el.value='What are premature termination codons (PTCs)?';}}>
          <small>PUBLIC</small>
          <h4>What are premature termination codons?</h4>
        </a>
        <a className="card" data-variant="clinician" href="#chat" onClick={(e)=>{e.preventDefault(); const el=document.getElementById('q'); if(el) el.value='How would a clinician refer a patient for potential suppressor tRNA therapy?';}}>
          <small>CLINICIAN</small>
          <h4>How do I refer a patient for genetic testing?</h4>
        </a>
        <a className="card" data-variant="researcher" href="#chat" onClick={(e)=>{e.preventDefault(); const el=document.getElementById('q'); if(el) el.value='Can researchers access the Translation Small-World platform?';}}>
          <small>RESEARCHER</small>
          <h4>Can I access the Translation Small-World platform?</h4>
        </a>
        <a className="card" data-variant="investor" href="#chat" onClick={(e)=>{e.preventDefault(); const el=document.getElementById('q'); if(el) el.value='What is KritRNA\'s competitive edge in tRNA therapeutics?';}}>
          <small>INVESTOR</small>
          <h4>What is your competitive advantage in tRNA therapeutics?</h4>
        </a>
      </section>

      <section className="panel">
        <h3 id="chat" style={{margin:0, padding:'6px 8px 10px'}}>Chat with Us</h3>
        <Chat />
      </section>

      <div className="footer">No medical advice. Company-info only. Off-topic questions may be refused.</div>
    </div>
  );
}
