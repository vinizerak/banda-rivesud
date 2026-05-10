exports.handler = async function(event) {
  const { q, nome, artista } = event.queryStringParameters || {};
  const term = nome ? (artista ? `${nome} ${artista}` : nome) : q;
  if (!term) {
    return { statusCode: 400, body: JSON.stringify({ error: 'missing params' }) };
  }
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=musicTrack&country=br&limit=5`;
    const resp = await fetch(url);
    const data = await resp.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
