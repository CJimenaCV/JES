const canales = [
    {
        "nombre": "Hackaday",
        "url": "https://hackaday.com/blog/feed/"
    },
    {
        "nombre": "Not A Blog: GRR Martin",
        "url": "https://georgerrmartin.com/notablog/feed/"
    },
    {
        "nombre": "El Almendrón",
        "url": "https://www.almendron.com/tribuna/feed/"
    }
];

const container = document.getElementById("canales");

canales.forEach(canal => {
    const feedUrl = canal.url;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const canalDiv = document.createElement("li");
            canalDiv.innerHTML = `<h2>${canal.nombre}</h2><ul></ul>`;
            const listaVideos = canalDiv.querySelector("ul");

            data.items.slice(0, 10).forEach(item => {
                const fecha = new Date(item.pubDate);
                const fechaTexto = fecha.toLocaleDateString("es-ES");
                const videoLink = document.createElement("li");
                const a = document.createElement("a");

                a.href = item.link;
                a.textContent = `${fechaTexto} - ${item.title}`;

                videoLink.appendChild(a);
                listaVideos.appendChild(videoLink);
            });

            container.appendChild(canalDiv);
        });
});



function sendHeight() {
    const height = document.documentElement.scrollHeight;
    parent.postMessage(
        { type: 'resize-iframe', height },
        '*' // puedes poner origen concreto luego por seguridad
    );
}

window.addEventListener('load', sendHeight);
window.addEventListener('resize', sendHeight);

// Opcional: si el contenido cambia mucho dinámicamente
const observer = new MutationObserver(sendHeight);
observer.observe(document.body, { childList: true, subtree: true });

