export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Metodo non consentito" };
    }

    try {
        const { file, slug } = JSON.parse(event.body);

        const blob = await get(`${file}.json`);
        if (!blob) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "File JSON non trovato" })
            };
        }

        let data = JSON.parse(await blob.text());
        const newData = data.filter(a => a.slug !== slug);

        if (newData.length === data.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Articolo non trovato" })
            };
        }

        await set(`${file}.json`, JSON.stringify(newData, null, 2));

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
