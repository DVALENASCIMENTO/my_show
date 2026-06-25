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
fetch("js/lyrics.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    lyricsData = data;
    console.log("Letras carregadas:", Object.keys(lyricsData));
  })
  .catch(err => {
    console.error("Erro ao carregar lyrics.json:", err);
  });

// Mostrar letra
function showLyrics(songName) {
  console.log("Música solicitada:", songName);
  console.log("Letra encontrada:", lyricsData[songName]);

  const lyrics = lyricsData[songName];

  document.getElementById("lyricsTitle").innerText = songName;
  document.getElementById("lyricsContent").innerText =
    lyrics || `Letra não encontrada para: "${songName}"`;

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
  { file: "music/Aline - Christophe (Playback).mp3", title: "Aline" },
  { file: "music/newYork,NewYork.mp3", title: "New York, New York" },
  { file: "music/brazil.mp3", title: "Brazil" },
  { file: "music/myWay.mp3", title: "My Way" },

  { file: "music/COISA LINDA.mp3", title: "Coisa Linda" },
  { file: "music/O SOL.mp3", title: "O Sol" },
  { file: "music/Amei Te Ver.mp3", title: "Amei Te Ver" },
  { file: "music/So os Loucos Sabem.mp3", title: "Só os Loucos Sabem" },

  { file: "music/Samba de Uma Nota Só.mp3", title: "Samba de Uma Nota Só" },
  { file: "music/Girl From Ipanema.mp3", title: "Girl From Ipanema" },
  { file: "music/Fly me to the moon Acoustic Bossa .mp3", title: "Fly Me To The Moon (Bossa)" },
  { file: "music/How Deep is Your Love.mp3", title: "How Deep Is Your Love" },
  { file: "music/Primavera.mp3", title: "Primavera" },
  { file: "music/Eu te devoro.mp3", title: "Eu Te Devoro" },
  { file: "music/Oceano.mp3", title: "Oceano" },
  { file: "music/TuSaisJeVaiTaimer.mp3", title: "Tu Sais Je Vais T'Aimer" },

  { file: "music/xodo.mp3.mp3", title: "Eu Só Quero Um Xodó" },
  { file: "music/Gostoso Demais.mp3", title: "Gostoso Demais" },
  { file: "music/Que Nem Jiló.mp3", title: "Que Nem Jiló" },
  { file: "music/Sabiá.mp3", title: "Sabiá" },
  { file: "music/Forró Desarmado.mp3", title: "Forró Desarmado" },

  { file: "music/Eu Só Quero um Xodó - Acoustic.mp3", title: "Eu Só Quero Um Xodó (Acoustic)" },
  { file: "music/Gostoso Demais - Acoustic.mp3", title: "Gostoso Demais (Acoustic)" },
  { file: "music/Sabiá - Acoustic.mp3", title: "Sabiá (Acoustic)" },
  { file: "music/Coração - Acoustic.mp3", title: "Coração (Acoustic)" },
  { file: "music/Até Mais Ver - Acoustic.mp3", title: "Até Mais Ver (Acoustic)" },
  { file: "music/Forró no Escuro - Acoustic.mp3", title: "Forró no Escuro (Acoustic)" },
  { file: "music/Numa Sala de Reboco - Acoustic.mp3", title: "Numa Sala de Reboco (Acoustic)" },
  { file: "music/Forró Desarmado - Acoustic.mp3", title: "Forró Desarmado (Acoustic)" },
  { file: "music/Seis Cordas - Acoustic.mp3", title: "Seis Cordas (Acoustic)" },
  { file: "music/Tareco e Mariola - Acoustic.mp3", title: "Tareco e Mariola (Acoustic)" },
  { file: "music/Que Nem Jiló - Acoustic.mp3", title: "Que Nem Jiló (Acoustic)" },
  { file: "music/o Xote das Meninas - Acoustic.mp3", title: "Xote das Meninas (Acoustic)" },
  { file: "music/Espumas ao Vento - Acoustic.mp3", title: "Espumas ao Vento (Acoustic)" },
  { file: "music/Caboclo Sonhador - Acoustic.mp3", title: "Caboclo Sonhador (Acoustic)" },
  { file: "music/Anunciação - Acoustic.mp3", title: "Anunciação (Acoustic)" },

  { file: "music/Just The Wy You Are.mp3", title: "Just The Way You Are" },
  { file: "music/Wicked Game.mp3", title: "Wicked Game" },
  { file: "music/Easy.mp3", title: "Easy" },
  { file: "music/africa.mp3", title: "Africa" },
  { file: "music/downUnder.mp3", title: "Down Under" },
  { file: "music/Get Lucky.mp3", title: "Get Lucky" },
  { file: "music/september.mp3", title: "September" },
  { file: "music/celebration.mp3", title: "Celebration" },
  { file: "music/Take On Me.mp3", title: "Take On Me" },
  { file: "music/Little Respect.mp3", title: "A Little Respect" },
  { file: "music/I Wanna Know What Love Is.mp3", title: "I Wanna Know What Love Is" },
  { file: "music/Dont Dream It´s Over.mp3", title: "Don't Dream It's Over" },
  { file: "music/Every Breath You Take.mp3", title: "Every Breath You Take" },
  { file: "music/WithOrWithoutYou.mp3", title: "With Or Without You" },
  { file: "music/everybodyWantsToRuleTheWorld.mp3", title: "Everybody Wants To Rule The World" },
  { file: "music/Can´t Help Falling in Love.mp3", title: "Can't Help Falling In Love" },

  { file: "music/Slave to Love Reggae BigBand.mp3", title: "Slave To Love" },
  { file: "music/Is This Love Reggae.mp3", title: "Is This Love" },
  { file: "music/vamosFugir.mp3", title: "Vamos Fugir" },
  { file: "music/Drive.mp3", title: "Drive" },
  { file: "music/rude.mp3", title: "Rude" },

  { file: "music/oAmorÉoCalor.mp3", title: "O Amor é o Calor" },

  { file: "music/SI NO TE HUBIERAS IDO.mp3", title: "Si No Te Hubieras Ido" },
  { file: "music/El Reloj.mp3", title: "El Reloj" },
  { file: "music/La Barca.mp3", title: "La Barca" },
  { file: "music/Mariposa Traicionera.mp3", title: "Mariposa Traicionera" },

  { file: "music/Oh, Pretty Woman.mp3", title: "Oh, Pretty Woman" },
  { file: "music/You Got It .mp3", title: "You Got It" },
  { file: "music/Here Comes The Sun.mp3", title: "Here Comes The Sun" },
  { file: "music/Its A Heartache.mp3", title: "It's A Heartache" },
  { file: "music/Have You Ever Seen The Rain - Rod.mp3", title: "Have You Ever Seen The Rain" },
  { file: "music/Starman.mp3", title: "Starman" },
  { file: "music/Reflections Of My Life.mp3", title: "Reflections Of My Life" },
  { file: "music/Something.mp3", title: "Something" },
  { file: "music/Simple Man.mp3", title: "Simple Man" },
  { file: "music/Wish You Were Here.mp3", title: "Wish You Were Here" },

  { file: "music/Mrs Robinson.mp3", title: "Mrs Robinson" },
  { file: "music/Mr Tambourim Man.mp3", title: "Mr Tambourine Man" },
  { file: "music/Take Me Home, Country Roads.mp3", title: "Take Me Home, Country Roads" },
  { file: "music/Follow Me.mp3", title: "Follow Me" }
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