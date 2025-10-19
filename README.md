
# KritRNA FAQ Chatbot (No Logo)

A minimal Next.js chatbot that answers questions **only** about your company using a local FAQ knowledge file.
- **No logo**; clean dark UI
- App Router (Next.js 14)
- Uses OpenAI API with a strict system prompt + your local `data/faq.md`
- Drop-in replacement: delete your old repo files and upload this entire folder

## Quick Start

1. Create `.env.local` in the project root:
```
OPENAI_API_KEY=YOUR_KEY_HERE
OPENAI_MODEL=gpt-4o-mini
```
2. Install deps & run:
```
npm i
npm run dev
```
3. Deploy to Vercel (recommended) or any Node host.

## Edit the FAQ
- Update **data/faq.md** — this file is injected into the model context every time.
- Keep answers concise and company-specific.
- To change the *tone/guardrails*, edit the system prompt in `app/api/chat/route.ts`.

## Route Summary
- `app/page.tsx` — the Ask page with example question tiles and the chat UI
- `app/api/chat/route.ts` — server endpoint that reads `faq.md` + sends to OpenAI
- `components/Chat.tsx` — simple chat component
- `styles/globals.css` — minimal dark theme

---

**Note:** The bot is designed to *refuse* off‑topic questions and anything not in your FAQ scope.
