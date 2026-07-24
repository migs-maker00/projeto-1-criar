/* Service worker — lembretes agendados + cache do app (PWA) */

const CACHE = "agenda-v2.5.3";
const alarmes = new Map();

const ARQUIVOS_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./js/main.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS_CACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

function limparAlarmes() {
  alarmes.forEach((id) => clearTimeout(id));
  alarmes.clear();
}

function agendarItem(item) {
  const delay = item.timestamp - Date.now();
  if (delay <= 0 || delay > 24 * 60 * 60 * 1000) return;

  const id = setTimeout(() => {
    self.registration.showNotification(item.title, {
      body: item.body,
      tag: item.tag,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      data: { url: item.url || "./", habitoId: item.habitoId },
      requireInteraction: Boolean(item.importante),
    });
  }, delay);

  alarmes.set(item.tag, id);
}

self.addEventListener("message", (event) => {
  const dados = event.data;
  if (!dados || dados.type !== "AGENDAR") return;

  limparAlarmes();
  const lista = Array.isArray(dados.agenda) ? dados.agenda : [];
  lista.forEach(agendarItem);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "./";
  const habitoId = event.notification.data?.habitoId;
  const destino = habitoId ? `${url.split("#")[0]}#habito-${habitoId}` : url;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((lista) => {
      for (const client of lista) {
        if ("focus" in client) {
          client.navigate(destino);
          return client.focus();
        }
      }
      return self.clients.openWindow(destino);
    })
  );
});
