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
        const { file, oldSlug, nome, slug, immagine, contenuto } = body;

        if (!file || !oldSlug || !nome || !slug || !contenuto) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Dati mancanti" })
            };
        }

        const filePath = path.join(__dirname, `/data/${file}.json`);

        let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const index = data.findIndex(a => a.slug === oldSlug);
        if (index === -1) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Articolo non trovato" })
            };
        }

        // 🔥 Controllo slug univoco (solo se cambiato)
        if (slug !== oldSlug) {
            const exists = data.some(a => a.slug === slug);
            if (exists) {
                return {
                    statusCode: 409,
                    body: JSON.stringify({ error: "Slug già esistente" })
                };
            }
        }

        // 🔥 Aggiorna articolo
        data[index] = { nome, slug, immagine, contenuto };

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
