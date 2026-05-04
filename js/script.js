let player = document.getElementById("player");
let currentMusic = null;
let nextMusic = null;
let isPlaying = false;

// Garante referência correta SEM depender do onload
document.addEventListener("DOMContentLoaded", () => {
  player = document.getElementById("player");

  player.addEventListener("play", () => {
    isPlaying = true;
  });

  player.addEventListener("pause", () => {
    isPlaying = false;
  });

  player.addEventListener("ended", () => {
    isPlaying = false;
    updateMusicName("Nenhuma música");
  });

  player.addEventListener("error", () => {
    alert("Erro ao carregar o áudio 😢");
    console.log("Erro no áudio:", player.src);
  });
});

// ▶️ Clicar na música
function playMusic(src, name) {

  if (!player) {
    console.error("Player não encontrado!");
    return;
  }

  // Se já está tocando, abre popup
  if (currentMusic && isPlaying) {
    nextMusic = { src, name };
    document.getElementById("popup").classList.add("active");
    return;
  }

  startMusic(src, name);
}

// ▶️ Iniciar música
function startMusic(src, name) {
  player.src = src;

  player.play()
    .then(() => {
      currentMusic = src;
      updateMusicName(name || "Tocando...");
    })
    .catch(err => {
      console.error("Erro ao tocar:", err);
      alert("Clique novamente para iniciar o áudio 🔊");
    });
}

// ✅ Confirma troca
function confirmChange() {
  if (nextMusic) {
    startMusic(nextMusic.src, nextMusic.name);
    nextMusic = null;
  }
  closePopup();
}

// ❌ Fecha popup
function closePopup() {
  document.getElementById("popup").classList.remove("active");
}

// 🎵 Atualiza nome da música
function updateMusicName(name) {
  const el = document.getElementById("musicName");
  if (el) el.innerText = name;
}

// ▶️ CONTROLES

function playCurrent() {
  if (player && player.src) {
    player.play();
  }
}

function pauseMusic() {
  if (player) player.pause();
}

function stopMusic() {
  if (player) {
    player.pause();
    player.currentTime = 0;
  }
  isPlaying = false;
  currentMusic = null;
  updateMusicName("Nenhuma música");
}

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}