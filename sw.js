/* Service worker — lembretes agendados + cache do app (PWA) */

const CACHE = "agenda-v2.7.0";
const alarmes = new Map();

const ARQUIVOS_CACHE = [
  "./manifest.webmanifest",
  "./icon-192.png",
  "./favicon-32.png",
  "./favicon-16.png",
  "./apple-touch-icon.png",
];

function ehArquivoDoApp(url) {
  const caminho = url.pathname;
  if (caminho.endsWith("/") || caminho.endsWith("/index.html")) return true;
  if (caminho.includes("/js/")) return true;
  if (caminho.endsWith("/style.css")) return true;
  if (caminho.endsWith("/sync.js")) return true;
  if (caminho.endsWith("/firebase-config.js")) return true;
  return false;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw new Error("offline");
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS_CACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (ehArquivoDoApp(url)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(cacheFirst(event.request));
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
  if (!dados) return;
  if (dados.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }
  if (dados.type !== "AGENDAR") return;

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
