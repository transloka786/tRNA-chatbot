
'use client';
import { useState, useRef, useEffect } from 'react';

type Msg = { role: 'user' | 'assistant', content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Hi! Ask me anything about KritRNA, our suppressor tRNA work, or partnerships.' }
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value?.trim();
    if (!q) return;
    setMessages(m => [...m, { role: 'user', content: q }]);
    if (inputRef.current) inputRef.current.value = '';
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    const data = await res.json();
    setMessages(m => [...m, { role: 'assistant', content: data.text }]);
    setLoading(false);
  }

  return (
    <div className="chat">
      <div className="history">
        {messages.map((m, i) => (
          <div key={i} className={'bubble ' + (m.role === 'user' ? 'user' : 'bot')}>{m.content}</div>
        ))}
        <div ref={endRef} />
      </div>
      <form className="form" onSubmit={onSend}>
        <input id="q" ref={inputRef} className="input" placeholder="Type your question..." />
        <button className="button" type="submit" disabled={loading}>{loading ? 'Thinking…' : 'Send'}</button>
      </form>
    </div>
  );
}
