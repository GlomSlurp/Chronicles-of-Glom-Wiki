export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Metodo non consentito" };
    }

    try {
        const { file, nome, slug, immagine, contenuto } = JSON.parse(event.body);

        const blob = await get(`${file}.json`);
        let data = blob ? JSON.parse(await blob.text()) : [];

        if (data.some(a => a.slug === slug)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Slug già esistente" })
            };
        }

        const nuovoArticolo = { nome, slug, immagine, contenuto };
        data.push(nuovoArticolo);

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
