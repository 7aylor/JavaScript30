const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.player__fullscreen');

function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime = video.currentTime + Number(this.dataset.skip);
    if(video.currentTime < 0) video.currentTime = 0;
    if(video.currentTime > video.duration) video.currentTime = video.duration;
}

function handleRangeUpdate(e) {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const percent = (e.offsetX / progress.offsetWidth);
    video.currentTime = video.duration * percent;
}

function toggleFullscreen() {
    if(fullscreenToggle) {
        player.classList.add('fullscreen');
        player.style.maxWidth = '100vw';
        document.querySelector('body').style.display = 'block';
    } else {
        player.classList.remove('fullscreen');
        player.style.maxWidth = '750px';
        document.querySelector('body').style.display = 'flex';
    }

    fullscreenToggle = !fullscreenToggle;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(x => x.addEventListener('click', skip));

ranges.forEach(x => x.addEventListener('change', handleRangeUpdate));
ranges.forEach(x => x.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

let fullscreenToggle = false;
fullscreen.addEventListener('click', toggleFullscreen);