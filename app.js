const music = new Audio('audio/1.mp3');
//music.play();

const songs= [
    {
        id: "1",
        songName: `On My Way <br> 
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/1.jpg"
    },
    {
        id: "2",
        songName: `Dandelions <br> 
        <div class="subtitle">Ruth B</div>`,
        poster: "img/2.jpg"
    },
    {
        id: "3",
        songName: `Baby <br> 
        <div class="subtitle">Justin Bieber</div>`,
        poster: "img/3.jpg"
    },
    {
        id: "4",
        songName: `Common Denominator <br> 
        <div class="subtitle">Justin Bieber</div>`,
        poster: "img/4.jpg"
    },
    {
        id: "5",
        songName: `Eenie Meenie <br> 
        <div class="subtitle">Justin Bieber</div>`,
        poster: "img/5.jpg"
    },
    {
        id: "6",
        songName: `Kesariya <br> 
        <div class="subtitle">Arjit Singh</div>`,
        poster: "img/6.jpg"
    },
    {
        id: "7",
        songName: `Apna bana le <br> 
        <div class="subtitle">Arjit Singh</div>`,
        poster: "img/7.jpg"
    },
    {
        id: "8",
        songName: `Adire Hridayam <br> 
        <div class="subtitle">Karthik</div>`,
        poster: "img/8.jpg"
    },
    {
        id: "9",
        songName: `Chilipiga <br> 
        <div class="subtitle">Karthik</div>`,
        poster: "img/9.jpg"
    },
    {
        id: "10",
        songName: `Tum hi ho <br> 
        <div class="subtitle">Arjit Singh</div>`,
        poster: "img/10.jpg"
    },
    {
        id: "11",
        songName: `O Saathi <br> 
        <div class="subtitle">Atif Aslam</div>`,
        poster: "img/11.jpg"
    },
    {
        id: "12",
        songName: `Jeena jeena <br> 
        <div class="subtitle">Atif Aslam</div>`,
        poster: "img/12.jpg"
    },
    {
        id: "13",
        songName: `Butta bomma <br> 
        <div class="subtitle">Armaan malik</div>`,
        poster: "img/13.jpg"
    },
    {
        id: "14",
        songName: `Ninne tholi premalo <br> 
        <div class="subtitle">Armaan malik</div>`,
        poster: "img/14.jpg"
    },
    {
        id: "15",
        songName: `Perfect <br> 
        <div class="subtitle">Ed sheeran</div>`,
        poster: "img/15.jpg"
    },
    {
        id: "16",
        songName: `Shape Of You <br> 
        <div class="subtitle">Ed sheeran</div>`,
        poster: "img/16.jpg"
    },
    {
        id: "17",
        songName: `Enchanted <br> 
        <div class="subtitle">Taylor Swift</div>`,
        poster: "img/17.jpg"
    },
    {
        id: "18",
        songName: `Love Story <br> 
        <div class="subtitle">Taylor Swift</div>`,
        poster: "img/18.jpg"
    },
    {
        id: "19",
        songName: `Cruel Summer <br> 
        <div class="subtitle">Taylor Swift</div>`,
        poster: "img/19.jpg"
    },
    {
        id: "20",
        songName: `Gorgeous <br> 
        <div class="subtitle">Taylor Swift</div>`,
        poster: "img/20.jpg"
    },

] 


// Function to initialize the music player
function initializeMusicPlayer() {
    let index = 0;
    const posterMasterPlay = document.getElementById('poster_master_play');
    const title = document.getElementById('title');
    const masterPlay = document.getElementById('masterPlay');
    const wave = document.getElementById('wave');
    const currentStart = document.getElementById('currentStart');
    const currentEnd = document.getElementById('currentEnd');
    
    // Function to update the current time and total duration
    function updateCurrentTime() {
        let music_curr = music.currentTime;
        let music_dur = music.duration;

        // Format the current time and total duration (in minutes and seconds)
        let currentTimeFormatted = formatTime(music_curr);
        let durationFormatted = formatTime(music_dur);

        // Update the elements with the formatted times
        currentStart.textContent = currentTimeFormatted;
        currentEnd.textContent = durationFormatted;
    }

    // Helper function to format time in minutes and seconds
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Function to play a song by index
    function playSong(index) {
        if (index >= 0 && index < songs.length) {
            music.src = `audio/${index + 1}.mp3`; // Assuming audio files are named from 1.mp3 to N.mp3
            posterMasterPlay.src = songs[index].poster;
            title.innerHTML = songs[index].songName;
            music.play();
            masterPlay.classList.remove('bi-play-fill');
            masterPlay.classList.add('bi-pause-fill');
            wave.classList.add('active1');
            updateCurrentTime();
        }
    }

    // Play the first song by default
    playSong(index);

    // Add event listener to the masterPlay button
    masterPlay.addEventListener('click', () => {
        if (music.paused || music.currentTime <= 0) {
            music.play();
            wave.classList.add('active1');
            masterPlay.classList.remove('bi-play-fill');
            masterPlay.classList.add('bi-pause-fill');
        } else {
            music.pause();
            wave.classList.remove('active1');
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
        }
    });

    // Add event listener to the playlist items
    const playlistItems = document.getElementsByClassName('playListPlay');
    Array.from(playlistItems).forEach((item, i) => {
        item.addEventListener('click', () => {
            index = i;
            playSong(index);
        });
    });

    // Add event listener to update the current time while the audio is playing
    music.addEventListener('timeupdate', updateCurrentTime);

    // Add event listener to handle volume control
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', () => {
        music.volume = volumeSlider.value / 100;
    });

    // Handle previous and next song buttons
    const prevSong = document.getElementById('prevSong');
    const nextSong = document.getElementById('nextSong');

    prevSong.addEventListener('click', () => {
        index = (index - 1 + songs.length) % songs.length;
        playSong(index);
    });

    nextSong.addEventListener('click', () => {
        index = (index + 1) % songs.length;
        playSong(index);
    });
}

// Call the initialize function when the page loads
window.addEventListener('load', initializeMusicPlayer);

let pop_song_left=document.getElementById('pop_song_left');
let pop_song_right=document.getElementById('pop_song_right');
let pop_song=document.getElementsByClassName('pop_song')[0];


pop_song_right.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
});
pop_song_left.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
}) ;

let pop_art_left=document.getElementById('pop_art_left');
let pop_art_right=document.getElementById('pop_art_right');
let Artists_bx=document.getElementsByClassName('Artists_bx')[0];


pop_art_right.addEventListener('click', ()=>{
    Artists_bx.scrollLeft += 330;
});
pop_art_left.addEventListener('click', ()=>{
    Artists_bx.scrollLeft -= 330;
}) ;

const seek = document.getElementById('seek');
const currentStart = document.getElementById('currentStart');
const currentEnd = document.getElementById('currentEnd');
const isSeeking = false;

// Initialize the audio and seek bar
music.addEventListener('loadedmetadata', () => {
    currentEnd.textContent = formatTime(music.duration);
});

music.addEventListener('timeupdate', () => {
    if (!isSeeking) {
        const currentTime = music.currentTime;
        seek.value = (currentTime / music.duration) * 100;
        currentStart.textContent = formatTime(currentTime);
    }
});


const progressBar = document.getElementById('bar2'); // Add an ID to your progress bar element

music.addEventListener('loadedmetadata', () => {
    seek.max = music.duration;
});

music.addEventListener('timeupdate', () => {
    const currentTime = music.currentTime;
    seek.value = currentTime;
    updateProgressBar(currentTime, music.duration);
});

seek.addEventListener('input', () => {
    const seekTime = seek.value;
    music.currentTime = seekTime;
    updateProgressBar(seekTime, music.duration);
});

// Helper function to update the progress bar
function updateProgressBar(currentTime, duration) {
    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressBarWidth}%`;
}

music.play(); // Start playing the audio


// Handle seeking when the seek bar is interacted with
seek.addEventListener('input', () => {
    const seekTime = (seek.value / 100) * music.duration;
    music.currentTime = seekTime;
    currentStart.textContent = formatTime(seekTime);
});

seek.addEventListener('mousedown', () => {
    isSeeking = true;
});

seek.addEventListener('mouseup', () => {
    isSeeking = false;
});

seek.addEventListener('click', (event) => {
    const percent = event.offsetX / seek.clientWidth;
    const seekTime = percent * music.duration;
    music.currentTime = seekTime;
    currentStart.textContent = formatTime(seekTime);
});

// Helper function to format time in minutes and seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}


let dotVisible = false;

music.addEventListener('loadedmetadata', () => {
    seek.max = music.duration;
});

music.addEventListener('timeupdate', () => {
    const currentTime = music.currentTime;
    seek.value = currentTime;
    if (dotVisible) {
        updateProgressBar(currentTime, music.duration);
    }
});

seek.addEventListener('input', () => {
    const seekTime = seek.value;
    music.currentTime = seekTime;
    if (dotVisible) {
        updateProgressBar(seekTime, music.duration);
    }
});

seek.addEventListener('click', (e) => {
    const clickPosition = e.clientX - seek.getBoundingClientRect().left;
    const seekWidth = seek.offsetWidth;
    const seekTime = (clickPosition / seekWidth) * music.duration;

    music.currentTime = seekTime;
    dotVisible = true;
    updateProgressBar(seekTime, music.duration);

    // Hide the dot (circle pointer) after a short delay
    setTimeout(() => {
        dotVisible = false;
        updateProgressBar(seekTime, music.duration);
    }, ); // Adjust the delay as needed for your preference
});

// Helper function to update the progress bar
function updateProgressBar(currentTime, duration) {
    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressBarWidth}%`;
}

const bar = document.querySelector('.bar');
const dot = document.querySelector('.dot');

bar.addEventListener('click', (event) => {
    // Calculate the click position relative to the bar's width
    const clickX = event.clientX - bar.getBoundingClientRect().left;
    const barWidth = bar.clientWidth;

    // Calculate the position as a percentage
    const positionPercentage = (clickX / barWidth) * 100;

    // Update the progress bar
    bar.querySelector('#bar2').style.width = `${positionPercentage}%`;

    // Update the dot's left position and add/remove the 'active' class
    dot.style.left = `${positionPercentage}%`;
    dot.classList.toggle('active');

    // You can also perform actions like seeking the music to the clicked position here
});

// Hide the dot when clicking elsewhere
document.addEventListener('click', (event) => {
    if (event.target !== dot && !dot.contains(event.target)) {
        dot.classList.remove('active');
    }
});

