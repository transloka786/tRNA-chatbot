'use client';
import { useState, useRef, useEffect } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        'Hi! Ask me anything about KritRNA, our suppressor tRNA work, or partnerships.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value?.trim();
    if (!q || loading) return;

    // Optimistically append the user message
    const newMessages: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages(newMessages);
    if (inputRef.current) inputRef.current.value = '';
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed with ${res.status}`);
      }

      const data: { text?: string } = await res.json();
      const reply = data.text ?? 'Sorry, I could not generate a response.';
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            'Hmm, something went wrong reaching the chat API. Please check your OPENAI_API_KEY on Vercel and try again.',
        },
      ]);
      // Optionally: console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat">
      <div className="history" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={'bubble ' + (m.role === 'user' ? 'user' : 'bot')}>
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="form" onSubmit={onSend}>
        <input
          id="q"
          ref={inputRef}
          className="input"
          placeholder="Type your question..."
          autoComplete="off"
          aria-label="Your question"
        />
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Thinking…' : 'Send'}
        </button>
      </form>
    </div>
  );
}
