// Getting the elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress")
const progressBar = progress.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]")
const ranges = player.querySelectorAll(".player__slider")



// Creating Functions
function togglePlay() {
    const method = video.paused ? "play" : "pause";
    // Using square bracket method return a string value
    video[method]();
}

function updateButton() {
    toggle.textContent = video.paused ? "▷" : "||"

}

function skip() {
    console.log(this.dataset.skip);
    // Value received from dataset is string
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpate() {
    video[this.name] = this.value;
    console.log(video[this.name]);


}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`

}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;

}

// Calling the funtions

video.addEventListener("click", togglePlay)
video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)
toggle.addEventListener("click", togglePlay)

skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => {

    range.addEventListener("change", handleRangeUpate)
    range.addEventListener("mousemove", handleRangeUpate)

})


video.addEventListener("timeupdate", handleProgress);

let mousedown = false

progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => mousedown && scrub(e))
progress.addEventListener("mousedown", () => mousedown = true)
progress.addEventListener("mouseup", () => mousedown = false) 