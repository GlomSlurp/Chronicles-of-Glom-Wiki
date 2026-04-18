let caratteristicheRef = null;

// Carica il file delle caratteristiche
fetch("../data/caratteristiche_ref.json")
    .then(r => r.json())
    .then(data => {
        caratteristicheRef = data;
    })
    .catch(err => {
        console.error("Errore nel caricamento di caratteristiche_ref.json", err);
    });

// ===============================
// PARAMETRI URL
// ===============================
const params = new URLSearchParams(window.location.search);
const file = params.get("file");
const slug = params.get("slug");
const from = params.get("from");
const personaggio = params.get("pg");

// ===============================
// FUNZIONE TITOLO
// ===============================
// aggiornaTitolo(nomePagina)
// Aggiorna il titolo visibile della pagina. Se la query string
// contiene `pg` (personaggio), mostra "<pg>'s <nomePagina>",
// altrimenti mostra solo il nome della pagina.
function aggiornaTitolo(nomePagina) {
    const titolo = document.getElementById("nome");
    if (personaggio) {
        titolo.textContent = personaggio + "'s " + nomePagina;
    } else {
        titolo.textContent = nomePagina;
    }
}

// ===============================
// LINK TORNA ALLA CATEGORIA
// ===============================
const backLink = document.getElementById("back-category");

// Se arrivo da una scheda personaggio
if (from) {
    backLink.href = `pagina.html?file=schede&slug=${from}`;

    // Rimuove i trattini e capitalizza ogni parola
    const nomePulito = from
        .split("-")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");

    backLink.textContent = "Torna a " + nomePulito;

} else {
    const categorieSchede = ["abilita"];
    backLink.href =
        categorieSchede.includes(file)
            ? "schede.html"
            : `${file}.html`;

    backLink.textContent = "Torna alla categoria";
}

// ===============================
// CARICAMENTO DATI
// ===============================
// Carica il file JSON corrispondente alla categoria `file` e renderizza
// la pagina corrispondente (contenuto o scheda personaggio).
fetch(`../data/${file}.json`)
    .then(r => r.json())
    .then(data => {

        const pagina = data.find(item => item.slug === slug);

        if (!pagina) {
            document.querySelector(".content").innerHTML = "<p>Pagina non trovata.</p>";
            return;
        }

        document.getElementById("page-title").textContent = `${pagina.nome} - Wiki`;
        document.getElementById("subtitle").textContent = `Wiki – ${pagina.nome}`;
        aggiornaTitolo(pagina.nome);

        // ===============================
        // PAGINA CONTENUTO (incantesimi ecc.)
        // ===============================
        if (pagina.contenuto) {

            let extra = "";

            if (pagina.azione_bonus) {
                extra += `<p><strong>Azione Bonus</strong></p>`;
            }

            if (pagina.reazione) {
                extra += `<p><strong>Reazione</strong></p>`;
            }

            if (pagina.durata) {
                extra += `<p><strong>Durata:</strong> ${pagina.durata}</p>`;
            }

            if (pagina.range){
                extra += `<p><strong>Range:</strong> ${pagina.range}</p>`;
            }

            if (pagina.descrizione) {
                extra += `<p>${pagina.descrizione}</p>`;
            }

            if (pagina.livello !== undefined && pagina.livello !== null) {
                extra += `<p><strong>Livello:</strong> ${pagina.livello}</p>`;
            }

            // contenuto principale
            const contenutoEl = document.getElementById("contenuto");
            contenutoEl.innerHTML = extra + pagina.contenuto;

            // upcast separato
            const upcastEl = document.getElementById("upcast");

            if (pagina.upcast) {
                upcastEl.innerHTML = `<h3>Upcast</h3><p>${pagina.upcast}</p>`;
                upcastEl.style.display = "block";
            } else {
                upcastEl.innerHTML = "";
                upcastEl.style.display = "none";
            }

            replaceScrambleWithEffect(contenutoEl);
        }

        // ===============================
        // SCHEDA PERSONAGGIO
        // ===============================
        else if (pagina.classe || pagina.livello || pagina.forza) {

            
            let proficiencyBonus = pagina.livello
                ? "+" + (2 + Math.floor((pagina.livello - 1) / 4))
                : "";

            let html = `
            <div class="scheda-personaggio">
                <h2>${pagina.nome}${pagina.classe ? " – " + pagina.classe : ""}</h2>
                ${pagina.livello ? "<p><strong>Livello:</strong> " + pagina.livello + "</p>" : ""}
                ${pagina.razza ? `<p><strong>Razza:</strong> ${pagina.razza}</p>` : ""}
                ${pagina.background ? `<p><strong>Background:</strong> ${pagina.background}</p>` : ""}
                ${pagina.punti_ferita ? `<p><strong>Punti Ferita:</strong> ${pagina.punti_ferita}</p>` : ""}
                ${pagina.velocita ? `<p><strong>Velocità:</strong> ${pagina.velocita}</p>` : ""}
                ${pagina.slot_incantesimi ? `<p><strong>Slot Incantesimi:</strong> ${pagina.slot_incantesimi}</p>` : ""}
                ${pagina.ki ? `<p><strong>Ki:</strong> ${pagina.ki}</p>` : ""}
                ${pagina.trasformazioni ? `<p><strong>Trasformazioni:</strong> ${pagina.trasformazioni}</p>` : ""}
                ${pagina.popolazione ? `<p><strong>Popolazione:</strong> ${pagina.popolazione}</p>` : ""}
                ${pagina.munizioni ? `<p><strong>Munizioni:</strong> ${pagina.munizioni}</p>` : ""}
                ${proficiencyBonus ? `<p><strong>Proficiency Bonus:</strong> ${proficiencyBonus}</p>` : ""}
            </div>
            `;

            if (pagina.forza) {
                html += `
                <h3>Statistiche</h3>
                <ul class="stat-list">
                    ${["forza","destrezza","costituzione","intelligenza","saggezza","carisma"].map(stat => {
                        const valore = pagina[stat];
                        const mod = Math.floor((valore - 10) / 2);
                        const modStr = mod >= 0 ? "+" + mod : mod;
                        return `
                            <li>
                                <span class="label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
                                <span class="value">${valore}</span>
                                <span class="mod">${modStr}</span>
                            </li>`;
                    }).join("")}
                </ul>`;
            }

// Tiri Salvezza: calcola e visualizza i tiri di salvezza in formato tabella
            if (Array.isArray(pagina.tiri_salvezza)) {
                function modSalvezza(valore) {
                    const sav = Math.floor((valore - 10) / 2);
                    return Math.ceil(sav / 2);
                }

                html += `<h3>Tiri Salvezza</h3><ul class="stat-list">`;
                pagina.tiri_salvezza.forEach(ts => {
                    // ts è una stringa tipo "forza", "destrezza", ecc.
                    const valoreCar = pagina[ts];

                    // Se manca la caratteristica → mostra solo il nome (senza modificatore)
                    if (valoreCar === undefined) {
                        html += `
                            <li>
                                <span class="label">${ts.charAt(0).toUpperCase() + ts.slice(1)}</span>
                                <span class="value"></span>
                                <span class="mod"></span>
                            </li>`;
                        return;
                    }

                    const modificatore = modSalvezza(valoreCar);
                    const modStr = modificatore >= 0 ? "+" + modificatore : modificatore;

                    html += `
                        <li>
                            <span class="label">${ts.charAt(0).toUpperCase() + ts.slice(1)}</span>
                            <span class="value"></span>
                            <span class="mod">${modStr}</span>
                        </li>`;
                });
                html += "</ul>";
            }


// Crea una mappa { "Abilità": "caratteristica" }
function creaMappaAbilità(caratteristicheRef) {
    const mappa = {};
    if (!Array.isArray(caratteristicheRef)) return mappa;

    caratteristicheRef.forEach(entry => {
        const keys = Object.entries(entry);
        if (!keys.length) return;

        const [car, abilList] = keys[0];
        if (Array.isArray(abilList)) {
            abilList.forEach(a => mappa[a] = car);
        }
    });

    return mappa;
}

const mappaAbilità = creaMappaAbilità(caratteristicheRef);

html += `<h3>Abilità</h3><ul class="stat-list">`;

pagina.abilità.forEach(raw => {

    // --- 1. Separiamo nome e modificatore manuale ---
    let nome = raw;
    let modManuale = null;

    const match = raw.match(/(.+?)([+-]\d+)$/);
    if (match) {
        nome = match[1].trim();
        modManuale = parseInt(match[2]);
    }

    // --- 2. Se c’è un modificatore manuale, usiamo quello ---
    if (modManuale !== null) {
        const modStr = modManuale >= 0 ? "+" + modManuale : modManuale;

        html += `
            <li>
                <span class="label">${nome}</span>
                <span class="value"></span>
                <span class="mod">${modStr}</span>
            </li>`;
        return;
    }

    // --- 3. Altrimenti calcolo automatico ---
    const caratteristica = mappaAbilità[nome];

    if (!caratteristica || pagina[caratteristica] === undefined) {
        html += `
            <li>
                <span class="label">${nome}</span>
                <span class="value"></span>
                <span class="mod"></span>
            </li>`;
        return;
    }

    const valoreCar = pagina[caratteristica];
    const modificatore = Math.floor((valoreCar - 10) / 2);
    const modStr = modificatore >= 0 ? "+" + modificatore : modificatore;

    html += `
        <li>
            <span class="label">${nome}</span>
            <span class="value"></span>
            <span class="mod">${modStr}</span>
        </li>`;
});

html += "</ul>";


            if (Array.isArray(pagina.tratti_speciali)) {
                html += `<h3>Tratti Speciali</h3><ul>${pagina.tratti_speciali.map(t => `<li>${t}</li>`).join("")}</ul>`;
            }

            if (Array.isArray(pagina.oggetti)) {
                html += `<h3>Oggetti</h3><ul>${pagina.oggetti.map(e => `<li>${e}</li>`).join("")}</ul>`;
            }

            if (Array.isArray(pagina.abilità_speciali)) {
                html += `<h3>Abilità Speciali</h3><ul>${pagina.abilità_speciali.map(s => `<li>${s}</li>`).join("")}</ul>`;
            }

            if (Array.isArray(pagina.trucchetti)) {
                html += `<h3>Trucchetti</h3><ul>${pagina.trucchetti.map(t => `<li>${t}</li>`).join("")}</ul>`;
            }

            if (Array.isArray(pagina.incantesimi_conosciuti)) {
                html += `<h3>Incantesimi Conosciuti</h3><ul>${pagina.incantesimi_conosciuti.map(i => `<li>${i}</li>`).join("")}</ul>`;
            }

            if (Array.isArray(pagina.azioni)) {
                html += `<h3>Azioni</h3><ul>${pagina.azioni.map(a => `<li>${a}</li>`).join("")}</ul>`;
            }

            html += `</div>`;
            document.getElementById("contenuto").innerHTML = html;
            replaceScrambleWithEffect(document.getElementById("contenuto"));

            // AUTO-AGGIUNGE &from=slug A TUTTI I LINK INTERNI
            const links = document.querySelectorAll("#contenuto a");

            links.forEach(link => {
                if (!link.href.includes("file=")) return;

                const url = new URL(link.href);
                const paramsLink = url.searchParams;

                if (!paramsLink.has("from")) {
                    paramsLink.set("from", slug);
                    link.href = url.pathname + "?" + paramsLink.toString();
                }
            });
        }

        if (pagina.immagine && pagina.immagine.trim() !== "") {
            document.getElementById("infobox").innerHTML = `
                <div class="infobox">
                    <img src="../images/${pagina.immagine}" alt="${pagina.nome}">
                </div>`;
        }

    })
    .catch(err => {
        console.error("Errore nel caricamento:", err);
        document.querySelector(".content").innerHTML = "<p>Errore nel caricamento della pagina.</p>";
    });




// ===============================
// PREVIEW IMMAGINE LINK WIKI
// ===============================

let activeLinkRect = null;
const HIDE_DISTANCE = 50;
const previewCache = {};

document.addEventListener("mouseover", function (event) {
    const link = event.target;

    if (link.tagName !== "A" || !link.href || !link.href.includes("file=")) return;

    const urlParams = new URLSearchParams(link.search);
    const linkFile = urlParams.get("file");
    const linkSlug = urlParams.get("slug");

    if (!linkFile || !linkSlug) return;

    activeLinkRect = link.getBoundingClientRect();

    // showPreview(img)
    // Mostra l'anteprima immagine vicino al cursore quando il link punta
    // a una pagina wiki che ha il campo `immagine` nel suo JSON.
    function showPreview(img) {
        let preview = document.getElementById("image-preview");

        if (!preview) {
            preview = document.createElement("img");
            preview.id = "image-preview";
            preview.style.position = "absolute";
            preview.style.display = "none";
            document.body.appendChild(preview);
        }

        preview.src = `../images/${img}`;
        preview.style.top = (event.pageY + 12) + "px";
        preview.style.left = (event.pageX + 12) + "px";
        preview.style.opacity = "1";
        preview.style.display = "block";
    }

    if (previewCache[linkSlug]) {
        showPreview(previewCache[linkSlug]);
    } else {
        fetch(`../data/${linkFile}.json`)
            .then(r => r.json())
            .then(data => {
                const item = data.find(i => i.slug === linkSlug);
                if (item && item.immagine) {
                    previewCache[linkSlug] = item.immagine;
                    showPreview(item.immagine);
                }
            });
    }
});

document.addEventListener("mousemove", function (event) {
    const preview = document.getElementById("image-preview");
    if (!preview || preview.style.display !== "block" || !activeLinkRect) return;

    const linkCenterX = activeLinkRect.left + activeLinkRect.width / 2;
    const linkCenterY = activeLinkRect.top + activeLinkRect.height / 2;

    const dx = event.clientX - linkCenterX;
    const dy = event.clientY - linkCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > HIDE_DISTANCE) {
        preview.style.opacity = "0";
        setTimeout(() => {
            preview.style.display = "none";
            activeLinkRect = null;
        }, 150);
    }
});




// ===============================
// EFFETTO SCRAMBLE
// ===============================
setInterval(() => {
    document.querySelectorAll(".scramble-loop").forEach(el => {
        const len = el.dataset.length || 12;
        let out = "";
        for (let i = 0; i < len; i++) {
            out += String.fromCharCode(33 + Math.random() * 94);
        }
        el.textContent = out;
    });
}, 55);

function replaceScrambleWithEffect(root) {
    root.innerHTML = root.innerHTML.replace(/SCRAMBLE/g, () => {
        return `<span class="scramble-loop" data-length="8"></span>`;
    });
}

// replaceScrambleWithEffect(root)
// Sostituisce il token "SCRAMBLE" nel contenuto con uno span che verrà
// aggiornato dall'animazione di scramble periodica.

// Anno corrente nel footer
document.getElementById('currentYear').textContent = new Date().getFullYear();