const CACHE_NAME = "dnd-wiki-v1";

const ASSETS = [
    //pagina principale
  "index.html",
  "manifest.json",
    //css
  "./styles/wiki_styles.css",
    //data
  "./data/persone.json",
  "./data/creature.json",
  "./data/divinita.json",
  "./data/equipaggiamento.json",
  "./data/geografia.json",
  "./data/gruppi.json",
  "./data/incantesimi.json",
  "./data/lore.json",
  "./data/luoghi.json",
  "./data/persone.json",
  "./data/quest.json",
  "./data/regole.json",
  "./data/schede.json",
    //pagine
  "./pagine/creature.html",
  "./pagine/divinita.html",
  "./pagine/geografia.html",
  "./pagine/gruppi.html",
  "./pagine/lore.html",
  "./pagine/luoghi.html",
  "./pagine/persone.html",
  "./pagine/quest.html",
  "./pagine/regole.html",
  "./pagine/schede.html",
  "./pagine/pagina.html",
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// ACTIVATE (pulizia cache vecchie)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache =>
          cache.put(event.request, clone)
        );
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});