
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "No OpenAI API key found" });
    return;
  }

  try {
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        temperature: 0.3,
        max_tokens: 800,
      }),
    });
    const data = await apiRes.json();
    res.status(200).json({ result: data.choices?.[0]?.message?.content ?? "No response" });
  } catch (error) {
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
