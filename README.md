# 🧙‍♂️ D&D Campaign Wiki

Benvenuto nella wiki ufficiale della campagna di Dungeons & Dragons creata da Paolo.  
Il sito è ospitato tramite **GitHub Pages** ed è completamente statico: ogni pagina è generata da file HTML, CSS, JavaScript e JSON.

🌐 **Wiki online:**  
👉 https://glomslurp.github.io/Chronicles-of-Glom-Wiki/index.html

---

## 📚 Contenuti della Wiki

La wiki raccoglie tutte le informazioni del mondo di gioco, organizzate in categorie:

- **Personaggi**
- **Creature**
- **Luoghi**
- **Geografia**
- **Gruppi e Fazioni**
- **Divinità**
- **Lore generale**
- **Regole**

Ogni categoria è alimentata da un file JSON nella cartella `/data`, mentre le pagine HTML nella cartella `/pagine` mostrano i contenuti in modo navigabile.

---

## 🛠️ Editor Statico (per modificare la wiki)

Questo repository include un editor statico che permette di modificare facilmente i file JSON della wiki.

📍 **Percorso:**  
`/admin/admin_wiki_editor.html`

### Funzionalità dell’editor

- Caricamento di un file JSON dalla cartella `/data`
- Visualizzazione degli articoli contenuti nel file
- Modifica di articoli esistenti
- Aggiunta di nuovi articoli
- Eliminazione di articoli
- Generazione del JSON aggiornato
- **Download del JSON aggiornato** pronto per essere sostituito nel repository

L’editor funziona interamente nel browser e non richiede backend.

### Come usarlo

1. Apri `admin/admin_wiki_editor.html` nel browser  
2. Seleziona il file JSON da modificare  
3. Clicca **Carica file**  
4. Modifica o aggiungi articoli  
5. Clicca **Aggiorna JSON**  
6. Clicca **Scarica JSON aggiornato**  
7. Sostituisci il file nella cartella `/data` del repository  
8. Commit + push  
9. GitHub Pages aggiornerà automaticamente il sito

---

## 📁 Struttura del Repository

/
├── index.html                                # Home della wiki
├── pagine/                   # Pagine HTML della wiki
│   ├── persone/
│   ├── creature/
│   ├── luoghi/
│   ├── geografia/
│   ├── gruppi/
│   ├── divinita/
│   ├── lore/
|   └──Regole/
├── data/                     # Database statico in formato JSON
│   ├── persone.json
│   ├── creature.json
│   ├── luoghi.json
│   ├── geografia.json
│   ├── gruppi.json
│   ├── divinita.json
│   ├── lore.json
|   └── regole.json
├── styles/                   # Fogli di stile
├── images/                   # Immagini
└── admin/                    # Editor statico
    └── admin_wiki_editor.html

Codice

---

## 🔗 Collegamenti Interni

Per collegare una pagina della wiki a un’altra, usa percorsi relativi tramite tinyMCE copiando il link pulito

🌐 Hosting su GitHub Pages
Il sito è pubblicato tramite GitHub Pages:

Nessun backend

Nessun limite di traffico

Aggiornamento automatico dopo ogni commit

📜 Licenza
Questo progetto è destinato all’uso personale e non commerciale.
Tutti i contenuti narrativi appartengono al creatore della campagna.