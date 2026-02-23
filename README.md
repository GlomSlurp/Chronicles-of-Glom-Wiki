# Chronicles of Glom – Wiki

Benvenuto nella **Wiki ufficiale di Chronicles of Glom**, un archivio digitale dedicato al mondo, alla storia, ai personaggi e agli elementi narrativi dell’ambientazione utilizzata nella campagna D&D.

Questa wiki è pensata per essere:
- una risorsa rapida per i giocatori,
- un archivio ordinato per il Dungeon Master,
- un riferimento sempre aggiornato per tutto ciò che riguarda il mondo di Glom.

👉 **Wiki online:**  
https://glomslurp.github.io/Chronicles-of-Glom-Wiki/


---

## 📚 Struttura del progetto

La wiki è completamente statica e funziona tramite:

- **HTML** per la struttura delle pagine  
- **CSS** per lo stile  
- **JavaScript** per la ricerca e il caricamento dinamico dei contenuti  
- **JSON** per i dati delle varie sezioni

La struttura principale è:

/Chronicles-of-Glom-Wiki
    /admin
    admin_wiki_editor.html
    /data
        creature.json
        divinita.json
        geografia.json
        gruppi.json
        incantesimi.json
        lore.json
        luoghi.json
        oggetti.json
        persone.json
        quest.json
        regole.json
        schede.json
    /images
        /creature
        /geografia
        /gruppi
        /lore
        /luoghi_importanti
        /oggetti
        /persone
        /regole
    /pagine
        pagina.html
        search.html
    /styles
        wiki_style.css
    index.html

Ogni file JSON rappresenta una categoria della wiki e contiene una lista di voci, ognuna con:

```json
{
    "nome": "Nome della voce",
    "slug": "nome-della-voce",
    "immagine":"immagine-della-voce.png",
    "contenuto": "Testo della pagina",
    "durata":"durata incantesimo",
    "livello":"livello incantesimo",
    "reazione":1 "oppure" 0,
    "azione_bonus":1 "oppure" 0
}

🔍 Sistema di ricerca avanzato
La pagina search.html include un motore di ricerca client‑side che funziona interamente in JavaScript e supporta:

✔ Ricerca su tutti i campi
Il sistema analizza l’intero contenuto dei JSON, inclusi:

nome

contenuto

liste di oggetti, incantesimi, abilità

campi aggiuntivi

✔ Ranking dei risultati
I risultati vengono ordinati per pertinenza in base a:

match esatto nel nome

match parziale

match nel contenuto

inizio del nome

similarità fuzzy

✔ Fuzzy search
La ricerca tollera errori di digitazione:

“spadda”

“spda”

“spada lngua”

✔ Compatibile al 100% con GitHub Pages
Nessun backend, nessuna libreria esterna: tutto funziona lato client.

✏️ Come aggiungere nuove voci alla wiki
Per aggiungere una nuova voce:

Apri il file JSON della categoria corretta (es. oggetti.json)

Aggiungi un nuovo oggetto seguendo la struttura:
{
    "nome": "Nuovo Oggetto",
    "slug": "nuovo-oggetto",
    "immagine":"nuova immagine.png",
    "contenuto": "Descrizione completa dell'oggetto."
}
Salva il file

Commit to main

Push

GitHub Pages aggiornerà automaticamente la wiki

Suggerimenti
Lo slug deve essere unico e senza spazi

Il campo contenuto può contenere HTML

🧭 Navigazione della wiki
La wiki è organizzata in categorie principali:

Schede personaggi

Quest

Persone

Creature

Luoghi

Lore

Gruppi

Geografia

Divinità

Incantesimi

Oggetti

Regole


Ogni voce è accessibile tramite:

la pagina principale

la barra di ricerca

i link interni tra le pagine

🛠 Tecnologie utilizzate
HTML5

CSS3

JavaScript vanilla

GitHub Pages per l’hosting

JSON come database statico

Buona esplorazione nel mondo di Chronicles of Glom!