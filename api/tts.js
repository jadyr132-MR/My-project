export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const textToSpeak = (body.text || body.input?.text || body.input?.ssml || '').replace(/<[^>]*>/g, '').trim();

    if (!textToSpeak) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Servicio de voz en inglés
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(textToSpeak)}`;
    
    const audioRes = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!audioRes.ok) {
      throw new Error(`TTS upstream error: ${audioRes.statusText}`);
    }

    const arrayBuffer = await audioRes.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const audioContent = btoa(binary);

    // Retorna el formato exacto que TalkingHead espera
  return new Response(JSON.stringify({ 
    audioContent, 
    timepoints: [] 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}