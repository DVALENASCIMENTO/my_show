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

// LETRAS
let lyricsData = {};

// Carrega JSON das letras
fetch("data/lyrics.json")
  .then(response => response.json())
  .then(data => {
    lyricsData = data;
  })
  .catch(err => {
    console.error("Erro ao carregar letras:", err);
  });

// Mostrar letra
function showLyrics(songName) {
  const lyrics = lyricsData[songName] || "Letra não disponível.";

  document.getElementById("lyricsTitle").innerText = songName;
  document.getElementById("lyricsContent").innerText = lyrics;
  document.getElementById("lyricsPopup").classList.add("active");
}

// Fechar letra
function closeLyrics() {
  document.getElementById("lyricsPopup").classList.remove("active");
}



const playlist = [
  { file: "music/emocoes.mp3", title: "Emoções - Roberto Carlos" },
  { file: "music/flyMeToTheMoon.mp3", title: "Fly Me To The Moon" },
  { file: "music/SomewhereOvertheRainbow.mp3", title: "Somewhere Over The Rainbow" },
  { file: "music/beyondtheSea.mp3", title: "La Mer" },
  { file: "music/Perfídia Jazz Bigband .mp3", title: "Perfídia" },
  { file: "music/ItsMyLife.mp3", title: "It's My Life" },
  { file: "music/jump.mp3", title: "Jump" },
  { file: "music/letMeTryAgain.mp3", title: "Let Me Try Again" },
  { file: "music/myWay.mp3", title: "My Way" },
  { file: "music/newYork,NewYork.mp3", title: "New York, New York" },
  { file: "music/brazil.mp3", title: "Brazil" },
  { file: "music/Samba de Uma Nota Só.mp3", title: "Samba de Uma Nota Só" },
  { file: "music/TuSaisJeVaiTaimer.mp3", title: "Tu Sais Je Vai T'aimer" },
  { file: "music/Aline - Christophe (Playback).mp3", title: "Aline" },
  { file: "music/Easy.mp3", title: "Easy" },
  { file: "music/Dont Dream It´s Over.mp3", title: "Don't Dream It's Over" },
  { file: "music/Every Breath You Take.mp3", title: "Every Breath You Take" },
  { file: "music/WithOrWithoutYou.mp3", title: "With Or Without You" },
  { file: "music/Just The Wy You Are.mp3", title: "Just The Way You Are" },
  { file: "music/Little Respect.mp3", title: "A Little Respect" },
  { file: "music/africa.mp3", title: "Africa" },
  { file: "music/I Wanna Know What Love Is.mp3", title: "I Wanna Know What Love Is" },
  { file: "music/Can´t Help Falling in Love.mp3", title: "Can't Help Falling In Love" },
  { file: "music/Slave to Love Reggae BigBand.mp3", title: "Slave To Love" },
  { file: "music/Is This Love Reggae.mp3", title: "Is This Love" },
  { file: "music/vamosFugir.mp3", title: "Vamos Fugir" },
  { file: "music/rude.mp3", title: "Rude" }
];

let currentIndex = 0;

const playlistPlayer = document.getElementById("playlistPlayer");
const currentTrack = document.getElementById("currentTrack");

playlistPlayer.src = playlist[currentIndex].file;

playlistPlayer.addEventListener("ended", () => {
  currentIndex++;

  if (currentIndex >= playlist.length) {
    currentIndex = 0; // reinicia a playlist
  }

  playlistPlayer.src = playlist[currentIndex].file;
  currentTrack.textContent = playlist[currentIndex].title;
  playlistPlayer.play();
});

playlistPlayer.addEventListener("play", () => {
  currentTrack.textContent = playlist[currentIndex].title;
});

function playPlaylist() {
  playlistPlayer.play();
}

function pausePlaylist() {
  playlistPlayer.pause();
}

function nextTrack() {
  currentIndex++;

  if (currentIndex >= playlist.length) {
    currentIndex = 0;
  }

  playlistPlayer.src = playlist[currentIndex].file;
  currentTrack.textContent = playlist[currentIndex].title;
  playlistPlayer.play();
}

function prevTrack() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = playlist.length - 1;
  }

  playlistPlayer.src = playlist[currentIndex].file;
  currentTrack.textContent = playlist[currentIndex].title;
  playlistPlayer.play();
}