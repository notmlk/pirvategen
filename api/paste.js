// api/paste.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, content } = req.body;
  const API_KEY = process.env.PASTEFY_API_KEY; // Clé stockée dans les variables d'environnement

  try {
    const response = await fetch('https://pastefy.app/api/pastes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, // Si l'API le nécessite
      },
      body: JSON.stringify({
        content,
        expire_date: '1D',
        title,
      }),
    });

    if (!response.ok) {
      throw new Error(`Pastefy API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({ url: `https://pastefy.app/${data.data.paste.id}/raw` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload to Pastefy' });
  }
}
