// netlify/functions/addArticle.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Metodo non consentito"
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { file, nome, slug, immagine, contenuto } = body;

    if (!file || !nome || !slug || !contenuto) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Dati mancanti" })
      };
    }

    const filePath = path.join(__dirname, `../../../data/${file}.json`);

    let data = [];
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // 🔥 Controllo slug univoco
    const exists = data.some(item => item.slug === slug);
    if (exists) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: "Slug già esistente" })
      };
    }

    // 🔥 Aggiunta articolo
    data.push({ nome, slug, immagine, contenuto });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
