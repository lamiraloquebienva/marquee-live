console.log("app.js cargado correctamente");

const listenButton = document.getElementById("listenButton");
const albumSection = document.getElementById("album");

const creditsButton = document.getElementById("creditsButton");
const creditsModal = document.getElementById("creditsModal");
const closeCredits = document.getElementById("closeCredits");

// Bloquear scroll inicial en celulares
if (window.matchMedia("(max-width: 768px)").matches) {

    document.documentElement.classList.add("intro-locked");
    document.body.classList.add("intro-locked");

}

if (listenButton && albumSection) {

    listenButton.addEventListener("click", () => {

    // Liberar el scroll al comenzar el concierto
        document.documentElement.classList.remove("intro-locked");
        document.body.classList.remove("intro-locked");

        const concertPlayer = document.getElementById("concertPlayer");
        const albumCover = document.querySelector(".album-cover");
        const playlist = document.getElementById("playlist");
        const liveGallery = document.getElementById("liveGallery");

        albumSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

        albumCover.classList.add("moveUp");

        setTimeout(() => {

            concertPlayer.classList.add("visible");

            togglePlayback();


        }, 300);

        setTimeout(() => {

            playlist.classList.add("visible");

        }, 550);

        setTimeout(() => {

            liveGallery.classList.add("visible");

        }, 800);

    });

}

// =====================================
// REPRODUCTOR DEL ÁLBUM
// =====================================

const albumAudio = document.getElementById("albumAudio");
// =====================================
// PLAYLIST DEL ÁLBUM
// =====================================

const playlist = [

    {
        title: "Intro y Cumbia Buena",
        file: "audio/01-intro-y-cumbia-buena.mp3",
        duration: "6:21"
    },

    {
        title: "Solo Vos Solo Yo",
        file: "audio/02-solo-vos-solo-yo.mp3",
        duration: "4:21"
    },

    {
        title: "Cumbia Candela",
        file: "audio/03-cumbia-candela.mp3",
        duration: "3:26"
    },

    {
        title: "Pobre Corazón",
        file: "audio/04-pobre-corazon.mp3",
        duration: "4:07"
    },

    {
        title: "Negra Ron y Velas",
        file: "audio/05-negra-ron-y-velas.mp3",
        duration: "4:26"
    },

    {
        title: "No Me Sueltes",
        file: "audio/06-no-me-sueltes.mp3",
        duration: "6:20"
    },

    {
        title: "El Pescador",
        file: "audio/07-el-pescador.mp3",
        duration: "2:54"
    },

    {
        title: "El Cafetero",
        file: "audio/08-el-cafetero.mp3",
        duration: "2:52"
    },

    {
        title: "Esa Luz",
        file: "audio/09-esa-luz.mp3",
        duration: "4:26"
    },

    {
        title: "La Casa en el Aire",
        file: "audio/10-la-casa-en-el-aire.mp3",
        duration: "3:27"
    },

    {
        title: "El Campanero",
        file: "audio/11-el-campanero.mp3",
        duration: "4:30"
    },

    {
        title: "Te Vas",
        file: "audio/12-te-vas.mp3",
        duration: "4:16"
    }

];

let currentSong = 0;
let playlistItems = [];

const songTitle = document.getElementById("songTitle");
const trackInfo = document.getElementById("trackInfo");
const albumCover = document.querySelector(".album-cover img");
const playSongButton = document.getElementById("playSong");
const prevSongButton = document.getElementById("prevSong");
const nextSongButton = document.getElementById("nextSong");

function pulseAlbumCover() {

    albumCover.classList.add("album-pulse");

    setTimeout(() => {

        albumCover.classList.remove("album-pulse");

    }, 350);

}

function updateEqualizerState() {

    const equalizer = document.querySelector(".track-playing");
    const playerStatus = document.getElementById("playerStatus");

    if (!equalizer) return;

    if (albumAudio.paused) {

        equalizer.classList.add("paused");

        if(playerStatus){

            playerStatus.textContent = "❚❚ PAUSADO";

        }

    } else {

        equalizer.classList.remove("paused");

        if(playerStatus){

            playerStatus.textContent = "● EN VIVO";

        }

    }

}



function loadSong(index) {

    currentSong = index;

    albumAudio.src = playlist[index].file;

    songTitle.classList.add("song-changing");

    setTimeout(() => {

        songTitle.textContent = playlist[index].title;

        trackInfo.textContent =
            `Tema ${index + 1} de ${playlist.length}`;

        songTitle.classList.remove("song-changing");

        pulseAlbumCover();

        const playerCard = document.getElementById("playerCard");

playerCard.classList.remove("player-pulse");

playerCard.offsetHeight;

playerCard.classList.add("player-pulse");

        changeLivePhotoNow();

        stopLiveGallery();

        if (!albumAudio.paused) {

            startLiveGallery();

}

    }, 180);

}

function updatePlaylistHighlight() {

    if (playlistItems.length === 0) return;

    playlistItems.forEach(item => {
        item.classList.remove("active");
    });

    playlistItems[currentSong].classList.add("active");

}


function nextSong() {

    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

renderPlaylist();

updatePlaylistHighlight();

albumAudio.play();

updateEqualizerState();

    playSongButton.textContent = "⏸";

}

function prevSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = playlist.length - 1;
    }

    loadSong(currentSong);

renderPlaylist();

updatePlaylistHighlight();

albumAudio.play();

updateEqualizerState();

   playSongButton.textContent = "⏸";

}

loadSong(currentSong);

// Reproducir / Pausar
function togglePlayback() {

    console.log("togglePlayback ejecutada");

    if (albumAudio.paused) {

        albumAudio.play();
        startLiveGallery();
        updateEqualizerState();

      
        playSongButton.textContent = "⏸";

    } else {

        albumAudio.pause();
        stopLiveGallery();
        updateEqualizerState();

       
        playSongButton.textContent = "▶";

    }

}

/*

playAlbumButton.addEventListener("click", () => {

    const concertPlayer = document.getElementById("concertPlayer");
    const albumCover = document.querySelector(".album-cover");

    albumCover.classList.add("moveUp");

    const playlist = document.getElementById("playlist");
    const liveGallery = document.getElementById("liveGallery");

    setTimeout(() => {

        concertPlayer.classList.add("visible");

    },200);

    setTimeout(() => {

        playlist.classList.add("visible");

    },450);

    setTimeout(() => {

        liveGallery.classList.add("visible");

    },700);

    togglePlayback();

    concertPlayer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

*/

// playAlbumButton.addEventListener("click", togglePlayback);




playSongButton.addEventListener("click", togglePlayback);

nextSongButton.addEventListener("click", nextSong);
prevSongButton.addEventListener("click", prevSong);

const progress = document.getElementById("progress");
const progressBar = document.querySelector(".progress-bar");
const timeDisplay = document.getElementById("timeDisplay");
const playlistContainer = document.getElementById("playlist");

// =====================================
// Barra de progreso y tiempo
// =====================================

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

albumAudio.addEventListener("timeupdate", () => {

    if (!albumAudio.duration) return;

    const percentage =
        (albumAudio.currentTime / albumAudio.duration) * 100;

    progress.style.width = percentage + "%";

    timeDisplay.textContent =
        `${formatTime(albumAudio.currentTime)} / ${formatTime(albumAudio.duration)}`;

});

// =====================================
// Al terminar una canción
// =====================================

albumAudio.addEventListener("ended", () => {

    if(currentSong < playlist.length - 1){

        nextSong();

    } else {

    stopLiveGallery();

    document.getElementById("playerCard")
        .style.display = "none";

    document.getElementById("playlist")
        .style.display = "none";

    const concertEnding =
        document.getElementById("concertEnding");

    concertEnding.classList.add("visible");

    setTimeout(() => {

        concertEnding.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 300);

}

});

// =====================================
// Reiniciar el concierto
// =====================================

const restartConcert =
    document.getElementById("restartConcert");

restartConcert.addEventListener("click", () => {

    document.getElementById("concertEnding")
        .classList.remove("visible");

    document.getElementById("playerCard")
        .style.display = "";

    document.getElementById("playlist")
        .style.display = "";

    loadSong(0);

    albumAudio.currentTime = 0;

    albumAudio.play();

    playSongButton.textContent = "⏸";


    shuffleLiveImages();

    changeLivePhotoNow();

    stopLiveGallery();

    startLiveGallery();

    renderPlaylist();

    updatePlaylistHighlight();

    updateEqualizerState();

});

// =====================================
// Crear playlist visual
// =====================================

function renderPlaylist() {

    playlistContainer.innerHTML = "";

    playlistItems = [];

    playlist.forEach((song, index) => {

        const item = document.createElement("div");

item.className = "playlist-item";

item.innerHTML = `

   ${
    index === currentSong
    ?

    `<div class="track-playing">
        <span></span>
        <span></span>
        <span></span>
    </div>`

    :

    `<div class="track-number">
        ${String(index + 1).padStart(2, "0")}
    </div>`
}

    <div class="track-title">
        ${song.title}
    </div>

    <div class="track-duration">
        ${song.duration}
    </div>

`;

item.addEventListener("click", () => {

    loadSong(index);

    renderPlaylist();

    updatePlaylistHighlight();

    albumAudio.play();

    playSongButton.textContent = "⏸";

});

playlistContainer.appendChild(item);

playlistItems.push(item);

    });

}

renderPlaylist();
updatePlaylistHighlight();

// =====================================
// Barra de progreso interactiva
// =====================================

progressBar.addEventListener("click", (event) => {

    if (!albumAudio.duration) return;

    const rect = progressBar.getBoundingClientRect();

    const clickX = event.clientX - rect.left;

    const percentage = clickX / rect.width;

    albumAudio.currentTime = percentage * albumAudio.duration;

});

// =====================================
// GALERÍA EN VIVO
// =====================================

const livePhoto = document.getElementById("livePhoto");

const liveImages = [

    "live01.jpg",
    "live02.jpg",
    "live03.jpg",
    "live04.jpg",
    "live05.jpg",
    "live06.jpg",
    "live07.jpg",
    "live08.jpg",
    "live09.jpg",
    "live10.jpg",
    "live11.jpg",
    "live12.jpg",
    "live13.jpg",
    "live14.jpg",
    "live15.jpg",
    "live16.jpg",
    "live17.jpg",
    "live18.jpg",
    "live19.jpg",
    "live20.jpg",
    "live21.jpg",
    "live22.jpg",
    "live23.jpg",
    "live24.jpg",
    "live25.jpg",
    "live26.jpg",
    "live27.jpg",
    "live28.jpg",
    "live29.jpg",
    "live30.jpg",
    "live31.jpg",
    "live32.jpg",
    "live33.jpg",
    "live34.jpg",
    "live35.jpg",
    "live36.jpg",
    "live37.jpg",
    "live38.jpg",
    "live39.jpg",
    "live40.jpg",
    "live41.jpg",
    "live42.jpg",
    "live43.jpg",
    "live44.jpg",
    "live45.jpg",
    "live46.jpg",
    "live47.jpg",
    "live48.jpg",
    "live49.jpg",
    "live50.jpg",
    "live51.jpg",
    "live52.jpg",
    "live53.jpg",
    "live54.jpg",
    "live55.jpg",
    "live56.jpg",
    "live57.jpg",
    "live58.jpg",
    "live59.jpg",
    "live60.jpg",
    "live61.jpg",
    "live62.jpg",
    "live63.jpg",
    "live64.jpg",
    "live65.jpg",
    "live66.jpg",
    "live67.jpg",
    "live68.jpg",
    "live69.jpg",
    "live70.jpg",
    "live71.jpg",
    "live72.jpg",
    "live73.jpg",
    "live74.jpg",
    "live75.jpg",
    "live76.jpg",
    "live77.jpg",
    "live78.jpg",
    "live79.jpg",
    "live80.jpg",
    "live81.jpg",
    "live82.jpg",
    "live83.jpg",
    "live84.jpg",
    "live85.jpg",
    "live86.jpg",
    
];

let shuffledImages = [];
let currentLive = 0;
let liveGalleryInterval = null;

function shuffleLiveImages(){

    shuffledImages = [...liveImages];

    for(let i = shuffledImages.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [shuffledImages[i], shuffledImages[j]] =
        [shuffledImages[j], shuffledImages[i]];

    }

    currentLive = 0;

}

function nextLivePhoto(){

    currentLive++;

    if(currentLive >= shuffledImages.length){

        shuffleLiveImages();

    }

    const nextImage =
        document.getElementById("livePhotoNext");

    nextImage.src =
        "images/live/" + shuffledImages[currentLive];

    nextImage.style.animation = "none";
    nextImage.offsetHeight;
    nextImage.style.animation =
        "kenBurns 6s linear forwards";

    nextImage.style.transition = "opacity .8s ease";
    livePhoto.style.transition = "opacity .8s ease";

    nextImage.style.opacity = 1;
    livePhoto.style.opacity = 0;

    setTimeout(() => {

        livePhoto.src = nextImage.src;

        livePhoto.style.animation = "none";
        livePhoto.offsetHeight;
        livePhoto.style.animation =
            "kenBurns 6s linear forwards";

        livePhoto.style.opacity = 1;
        nextImage.style.opacity = 0;

    },800);

}

function changeLivePhotoNow(){

    currentLive++;

    if(currentLive >= shuffledImages.length){

        shuffleLiveImages();

    }

    livePhoto.src = "images/live/" + shuffledImages[currentLive];

    // Reinicia el efecto Ken Burns
    livePhoto.style.animation = "none";

    livePhoto.offsetHeight;

    livePhoto.style.animation = "kenBurns 6s linear forwards";

}

function startLiveGallery(){

    if(shuffledImages.length === 0){

        shuffleLiveImages();

        // Mostrar inmediatamente una foto aleatoria
        livePhoto.src = "images/live/" + shuffledImages[0];

    }

    if(liveGalleryInterval) return;

    liveGalleryInterval = setInterval(nextLivePhoto, 6000);

}

function stopLiveGallery(){

    clearInterval(liveGalleryInterval);

    liveGalleryInterval = null;

}

// =====================================
// FICHA TÉCNICA
// =====================================

if (creditsButton && creditsModal && closeCredits) {

    console.log("Ficha técnica inicializada");

    creditsButton.addEventListener("click", () => {

        console.log("Click en Ficha técnica");

        creditsModal.classList.add("visible");

    });

    closeCredits.addEventListener("click", () => {

        console.log("Cerrar ficha técnica");

        creditsModal.classList.remove("visible");

    });

}