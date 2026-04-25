exports.handler = async function(event) {
  const q = event.queryStringParameters?.q;
  if (!q) return { statusCode: 400, body: 'Missing q' };

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=1&country=br`;
    const r = await fetch(url);
    const d = await r.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
      },
      body: JSON.stringify(d),
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ results: [] }) };
  }
};
