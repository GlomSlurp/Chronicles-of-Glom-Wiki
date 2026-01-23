import { set } from "@netlify/blobs";
import fs from "fs";
import path from "path";

export default async (request) => {
    try {
        const dataDir = path.resolve(process.cwd(), "data");
        const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));

        let report = [];

        for (const file of files) {
            const filePath = path.join(dataDir, file);
            const content = fs.readFileSync(filePath, "utf8");

            await set(file, content);

            report.push(`✔ Importato: ${file}`);
        }

        return new Response(report.join("\n"), {
            status: 200,
            headers: { "Content-Type": "text/plain" }
        });

    } catch (err) {
        return new Response("Errore: " + err.message, {
            status: 500
        });
    }
};
