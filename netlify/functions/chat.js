const https = require("https");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const payload = JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: `Eres ProfeFinanzas, un tutor amigable y entusiasta de educación financiera para jóvenes colombianos. 
Hablas de forma clara, cercana y con ejemplos de la vida real en Colombia (pesos colombianos, Davivienda, Bancolombia, Nequi, BVC, etc.).
Explicas conceptos financieros de manera simple sin jerga compleja.
Usas emojis con moderación. Respondes en máximo 3-4 párrafos cortos.
Si alguien pregunta por inversiones milagrosas o pirámides, adviertes claramente del riesgo.
No eres asesor financiero certificado y lo aclaras cuando corresponde.`,
      messages: body.messages || [],
    });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "API key no configurada en Netlify." }),
      };
    }

    const result = await new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: "api.anthropic.com",
          path: "/v1/messages",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "Content-Length": Buffer.byteLength(payload),
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve({ status: res.statusCode, body: data }));
        }
      );
      req.on("error", reject);
      req.write(payload);
      req.end();
    });

    return {
      statusCode: result.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: result.body,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
