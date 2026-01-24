export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Metodo non consentito" };
    }

    try {
        const { file, slug, nome, immagine, contenuto } = JSON.parse(event.body);

        const blob = await get(`${file}.json`);
        if (!blob) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "File JSON non trovato" })
            };
        }

        let data = JSON.parse(await blob.text());
        const index = data.findIndex(a => a.slug === slug);

        if (index === -1) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Articolo non trovato" })
            };
        }

        data[index] = { nome, slug, immagine, contenuto };

        await set(`${file}.json`, JSON.stringify(data, null, 2));

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
}
