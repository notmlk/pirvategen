export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { script } = req.body;

    const response = await fetch("https://pastefy.app/api/v2/paste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PASTEFY_KEY}`
      },
      body: JSON.stringify({
        title: "Vinhub Script",
        content: script,
        encrypted: false,
        expireAt: "1D"
      })
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
