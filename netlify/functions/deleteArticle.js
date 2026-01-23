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
        const { file, slug } = body;

        if (!file || !slug) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Dati mancanti" })
            };
        }

        const filePath = path.join(__dirname, `../../../data/${file}.json`);

        let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const newData = data.filter(a => a.slug !== slug);

        if (newData.length === data.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Articolo non trovato" })
            };
        }

        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

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
