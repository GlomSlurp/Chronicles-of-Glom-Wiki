📘 Chronicles of Glom – Wiki System
Sistema di gestione wiki per campagne D&D
(HTML + JavaScript + JSON + Netlify Functions)

🧱 Panoramica
La wiki è un sistema completamente statico lato frontend, con contenuti dinamici gestiti tramite Netlify Functions.
Gli articoli sono salvati in file JSON nella cartella /data, mentre le immagini risiedono nella cartella /images.

Il pannello Master permette di:

aggiungere articoli

modificare articoli

eliminare articoli

Il tutto senza PHP o database.

📂 Struttura del progetto
Codice
/data
    persone.json
    creature.json
    luoghi.json
    lore.json
    gruppi.json
    geografia.json
    divinita.json

/images
    (immagini statiche degli articoli)

/wiki_management
    wiki_admin.html
    wiki_add.html
    wiki_edit.html

/netlify/functions
    addArticle.js
    editArticle.js
    deleteArticle.js

/styles
    wiki_style.css
🧩 Come funziona
🔹 Frontend
Il frontend è composto da pagine HTML statiche che:

leggono i file JSON tramite fetch()

mostrano gli articoli

usano TinyMCE per l’editing del contenuto

inviano i dati alle Netlify Functions tramite fetch() POST

🔹 Backend (Netlify Functions)
Le funzioni serverless gestiscono:

aggiunta articoli → addArticle.js

modifica articoli → editArticle.js

eliminazione articoli → deleteArticle.js

Ogni funzione:

legge il file JSON corretto

modifica l’array degli articoli

riscrive il file aggiornato

garantisce che lo slug sia univoco

📝 Formato degli articoli
Ogni articolo è un oggetto JSON con questa struttura:

json
{
    "nome": "Il Fucking",
    "slug": "il-fucking",
    "immagine": "ilFucking.png",
    "contenuto": "<p>Testo HTML generato da TinyMCE</p>"
}
🖼️ Gestione delle immagini
✔ Immagini statiche
Le immagini degli articoli sono salvate nella cartella:

Codice
/images
Queste immagini:

vengono caricate manualmente nella repo

non vengono modificate dagli utenti

non vengono cancellate dai deploy Netlify

❗ Importante
Se un articolo fa riferimento a Kalu.png, l’immagine deve essere presente nella repo.

🛠️ Aggiungere un articolo
Apri wiki_add.html

Compila:

sezione

nome

slug

immagine (es. Kalu.png)

contenuto (TinyMCE)

Premi Salva

La funzione addArticle.js aggiorna il JSON corretto

🛠️ Modificare un articolo
Apri wiki_admin.html

Seleziona l’articolo

Modifica i campi

Premi Salva modifiche

La funzione editArticle.js aggiorna il JSON

🛠️ Eliminare un articolo
Apri wiki_admin.html

Clicca “Elimina”

Conferma

La funzione deleteArticle.js rimuove l’articolo dal JSON

🧪 Sviluppo in locale
Puoi aprire i file HTML direttamente oppure usare un server locale (es. Live Server).

Attenzione
Le Netlify Functions non funzionano in locale senza Netlify CLI.

Se vuoi testarle localmente:

Codice
npm install -g netlify-cli
netlify dev
Questo simula l’ambiente Netlify e permette alle funzioni di funzionare.

🚀 Deploy su Netlify
Collega la repo a Netlify

Netlify pubblica automaticamente il sito statico

Le funzioni in /netlify/functions vengono deployate come API serverless

I JSON modificati dalle funzioni vengono salvati nel deploy corrente

🔒 Autenticazione
Il sistema attuale non richiede autenticazione.
Chiunque conosca l’URL del pannello può modificare la wiki.

📌 Note finali
Gli slug devono essere univoci

Le immagini devono essere presenti nella repo

I JSON vengono modificati direttamente dalle funzioni

Il sistema è pensato per essere semplice, veloce e completamente statico lato frontend