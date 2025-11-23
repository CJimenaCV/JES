const canales = [
    {
        "nombre": "Sabine Hossenfelder",
        "id": "UC1yNl2E66ZzKApQdRuTQ4tw",
        "estrellas": null
    },
    {
        "nombre": "Rimenbah",
        "id": "UC3CCWYYBoSJcjMDQbtYb7MQ",
        "estrellas": null
    },
    {
        "nombre": "Rimenbah stuff",
        "id": "UCb_6gDAEEAetTmQNCy71oQQ",
        "estrellas": null
    },
    {
        "nombre": "Mas rimenbah stuff",
        "id": "UCXryneHXepKytL3SZbhC1fA",
        "estrellas": null
    },
    {
        "nombre": "Mas rimenbah stuff",
        "id": "UC3CCWYYBoSJcjMDQbtYb7MQ",
        "estrellas": null
    },
    {
        "nombre": "Midulive",
        "id": "UC8LeXCWOalN8SxlrPcG-PaQ",
        "estrellas": null
    },
    {
        "nombre": "Caleb Hammer",
        "id": "UCLe_q9axMaeTbjN0hy1Z9xA",
        "estrellas": null
    },
    {
        "nombre": "Alva Majo",
        "id": "UCmaEoq1zaakpdudbzgll-zw",
        "estrellas": null
    },
    {
        "nombre": "CleoAbram",
        "id": "UC415bOPUcGSamy543abLmRA",
        "estrellas": null
    },
    {
        "nombre": "CGP Grey",
        "id": "UC2C_jShtL725hvbm1arSV9w",
        "estrellas": null
    },
    {
        "nombre": "El calvo de geopolitica",
        "id": null,
        "estrellas": null
    },
    {
        "nombre": "El banquero del pueblo",
        "id": "UCDFerzGT1zx4ROFlYGAaXkQ",
        "estrellas": null
    },
    {
        "nombre": "elescocesgamer",
        "id": null,
        "estrellas": null
    },
    {
        "nombre": "Natural Habitat Shorts",
        "id": "UCSb_Sui6FBxVS4_ROsrU_Iw",
        "estrellas": null
    },
    {
        "nombre": "La chuca nutriologa china americana",
        "id": null,
        "estrellas": null
    },
    {
        "nombre": "Juan Ramon Rayo",
        "id": "UCBLCvUUCiSqBCEc-TqZ9rGw",
        "estrellas": null
    }
];

const container = document.getElementById("canales");

canales.forEach(canal => {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${canal.id}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        const canalDiv = document.createElement("li");
        canalDiv.innerHTML = `<h2>${canal.nombre}</h2><ul></ul>`;
        const listaVideos = canalDiv.querySelector("ul");

        data.items.slice(0, 5).forEach(item => {
            const videoId = new URL(item.link).searchParams.get("v");
            const fecha = new Date(item.pubDate);
            const fechaTexto = fecha.toLocaleDateString("es-ES");
            const videoLink = document.createElement("li");
            const a = document.createElement("a");

            a.href = "#";
            a.textContent = `${fechaTexto} - ${item.title}`;
            a.onclick = (e) => {
            e.preventDefault();
            reproducirEnPantallaCompleta(videoId);
            };
            videoLink.appendChild(a);
            listaVideos.appendChild(videoLink);
        });

        container.appendChild(canalDiv);
        });
});

function reproducirEnPantallaCompleta(videoId) {
    const iframe = document.getElementById("fullscreenPlayer");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.style.display = "block";
    const boton = document.getElementById("YTBoton");

    if (!iframe.src || iframe.src === "about:blank") {
      iframe.style.display = "none";
      boton.style.display = "block";
    } else {
      iframe.style.display = "block";
      boton.style.display = "none";
    }
}



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

