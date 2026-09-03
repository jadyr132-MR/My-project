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
    if (!body.input?.text && !body.input?.ssml) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = process.env.GOOGLE_TTS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GOOGLE_TTS_API_KEY is not configured on server' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const ttsBody = {
      ...body,
      audioConfig: {
        ...body.audioConfig,
        audioEncoding: body.audioConfig?.audioEncoding === 'OGG-OPUS'
          ? 'OGG_OPUS'
          : body.audioConfig?.audioEncoding
      },
      enableTimePointing: ['SSML_MARK']
    };

    const audioRes = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ttsBody)
    });

    const responseBody = await audioRes.text();
    if (!audioRes.ok) {
      return new Response(responseBody, {
        status: audioRes.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(responseBody, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}