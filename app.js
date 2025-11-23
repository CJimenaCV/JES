// Navegación entre "páginas"
const links = document.querySelectorAll('nav a, h1 a');
const pages = document.querySelectorAll('.page');

console.log("HOLA MUNDO")
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // evita recarga
    const target = link.dataset.page;
    console.log("HOLA MUNDO2")
    // Cambia sección visible
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${target}`).classList.add('active');
console.log("HOLA MUNDO3")
    // Marca la sección activa visualmente
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('message', (event) => {
  // Si quieres, aquí compruebas event.origin
  const data = event.data;
  if (!data || data.type !== 'resize-iframe') return;

  const iframe = document.getElementById('fullscreenPlayer');
  if (!iframe) return;

  iframe.style.height = data.height + 'px';
});



/*
// Reproductor básico
const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause');
const volumeInput = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const currentTrackLabel = document.getElementById('current-track');


let currentTrackSrc = audio.querySelector('source').src;

playPauseBtn.addEventListener('click', async () => {
  // Necesitas un click del usuario para que el navegador permita sonido
  if (audio.paused) {
    try {
      await audio.play();
      playPauseBtn.textContent = '⏸️';
    } catch (e) {
      console.error('No se pudo reproducir:', e);
    }
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

volumeInput.addEventListener('input', () => {
  audio.volume = volumeInput.value;
});

// Cambiar de canción desde la lista
if (playlist) {
  playlist.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;

    const src = li.dataset.src;
    if (!src) return;

    audio.src = src;       // cambia la canción
    currentTrackLabel.textContent = li.textContent;
    audio.play();
    playPauseBtn.textContent = '⏸️';
  });
}



*/