import { set } from "@netlify/blobs";
import fs from "fs";
import path from "path";

export async function handler(event) {
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            body: "Metodo non consentito"
        };
    }

    try {
        // Percorso della cartella /data nella repo
        const dataDir = path.resolve(process.cwd(), "data");

        // Legge tutti i file .json nella cartella
        const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));

        let report = [];

        for (const file of files) {
            const filePath = path.join(dataDir, file);

            // Legge il contenuto del JSON
            const content = fs.readFileSync(filePath, "utf8");

            // Salva nel Netlify Blob Storage
            await set(file, content);

            report.push(`✔ Importato: ${file}`);
        }

        return {
            statusCode: 200,
            body: report.join("\n")
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: "Errore: " + err.message
        };
    }
}
