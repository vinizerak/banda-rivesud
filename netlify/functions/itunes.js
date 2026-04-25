exports.handler = async function(event) {
  const q = event.queryStringParameters?.q;
  if (!q) return { statusCode: 400, body: 'Missing q' };

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=1&country=br`;
    const r = await fetch(url);
    const d = await r.json();

    if (!d.results?.length) {
      return { statusCode: 200, headers: cors(), body: JSON.stringify({ results: [] }) };
    }

    const item = d.results[0];
    const imgUrl = (item.artworkUrl100 || '').replace('100x100bb', '100x100bb');
    let dominantColor = null;
    if (imgUrl) {
      try { dominantColor = await extractColor(imgUrl); } catch(e) {}
    }

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({ results: d.results, dominantColor }),
    };
  } catch(e) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ results: [] }) };
  }
};

function cors() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=86400',
  };
}

async function extractColor(imgUrl) {
  const res = await fetch(imgUrl);
  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let r = 0, g = 0, b = 0, count = 0;
  // Skip first 200 bytes (headers), sample every 150 bytes
  for (let i = 200; i < bytes.length - 3; i += 150) {
    const pr = bytes[i], pg = bytes[i+1], pb = bytes[i+2];
    const brightness = (pr + pg + pb) / 3;
    if (brightness > 25 && brightness < 230 && pr < 250 && pg < 250 && pb < 250) {
      r += pr; g += pg; b += pb; count++;
    }
  }
  if (count < 3) return null;
  r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
  return {
    dark: `rgb(${Math.round(r*0.25)},${Math.round(g*0.25)},${Math.round(b*0.25)})`,
    mid:  `rgb(${Math.round(r*0.4)},${Math.round(g*0.4)},${Math.round(b*0.4)})`,
  };
}
