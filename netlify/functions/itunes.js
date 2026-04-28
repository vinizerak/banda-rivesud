exports.handler = async function(event) {
  const q = event.queryStringParameters?.q;
  if (!q) {
    return { statusCode: 400, body: JSON.stringify({ error: 'missing q' }) };
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=5`;
    const resp = await fetch(url);
    const data = await resp.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
