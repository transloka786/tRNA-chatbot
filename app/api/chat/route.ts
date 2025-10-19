export const runtime = 'nodejs';      // ensure Node runtime (allows fs/path)
export const dynamic = 'force-dynamic'; // no static caching of the chat route
import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM = `
You are "KritRNA Assistant", a concise, friendly company FAQ bot.
Guardrails:
- Only answer questions about KritRNA the company, suppressor tRNA, our platform, or partnership/process.
- If a question asks for personal medical advice, clinical dosing, or unrelated topics, reply briefly that you can only provide general, non-medical info and suggest contacting a clinician.
- If information is unknown or not in our FAQ context, say you don't have that detail publicly yet and provide a relevant high-level explanation.
- Keep answers under 160 words unless a list is helpful.
- Do not invent names, claims, or numbers. Never reveal proprietary algorithms.
- No logo references and no images. Plain text only.
`;

function getFAQContext() {
  const p = path.join(process.cwd(), 'data', 'faq.md');
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return '';
  }
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const faq = getFAQContext();
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: `Here is the latest public FAQ context. Use it for all answers.\n\n### FAQ\n${faq}`},
      ...messages
    ],
    temperature: 0.3,
  });

  const text = completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.';
  return new Response(JSON.stringify({ text }), { headers: { 'Content-Type': 'application/json' } });
}
