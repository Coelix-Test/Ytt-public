<template>
  <div>
    <audio controls>
      <source src="https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"  type="audio/mp3">
    </audio>
    <div style="width: 50px; height: 50px;"></div>
    <div class="audio-player">
      <div class="controls">
        <div class="time">
          0:00
        </div>
        <div class="timeline">
          <div class="progress"></div>
          <div class="track" @mousedown="startDrag"></div>
        </div>
        <div class="play-container">
          <div class="toggle-play play">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UAudioPlayer',
  data: () => ({
    dragging: false,
    audio: null,
    audioPlayer: null,
    timeToSeek: null,
    refreshTimelineInterval: null
  }),
  methods: {
    startDrag() {
      this.dragging = true;
      console.log(this.refreshTimelineInterval);
      clearInterval(this.refreshTimelineInterval);
      console.log(this.refreshTimelineInterval);

    },
    stopDrag() {
      if(!this.dragging) return;

      this.audio.currentTime = this.timeToSeek;
      this.dragging = false;
      this.refreshTimeline();
    },
    doDrag(event) {
      if (this.dragging) {
        const audioPlayer = document.querySelector(".audio-player");
        const timeline = audioPlayer.querySelector(".timeline");
        let diff = event.pageX - timeline.offsetLeft;
        const timelineWidth = parseInt(window.getComputedStyle(timeline).width);
        diff = diff < 0 ? 0 : diff > timelineWidth ? timelineWidth : diff;

        this.timeToSeek = diff / timelineWidth * this.audio.duration;
        // this.audio.currentTime = timeToSeek;

        const progressBar = audioPlayer.querySelector(".progress");
        const track = audioPlayer.querySelector(".track");
        progressBar.style.width = this.timeToSeek / this.audio.duration * 100 + "%";
        track.style.left = this.timeToSeek / this.audio.duration * 100 + "%";
        this.audioPlayer.querySelector(".time").textContent = this.getTimeCodeFromNum(this.timeToSeek);
      }
    },
    refreshTimeline(){
      clearInterval(this.refreshTimelineInterval);
      this.refreshTimelineInterval = setInterval(() => {
        console.log('INTERVAL: ', this.audio.currentTime);
        const progressBar = this.audioPlayer.querySelector(".progress");
        const track = this.audioPlayer.querySelector(".track");
        progressBar.style.width = this.audio.currentTime / this.audio.duration * 100 + "%";
        track.style.left = this.audio.currentTime / this.audio.duration * 100 + "%";
        this.audioPlayer.querySelector(".time").textContent = this.getTimeCodeFromNum(this.audio.currentTime);
      }, 100);
    },
    getTimeCodeFromNum(num){
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(
          seconds % 60
      ).padStart(2, 0)}`;
    }
  },
  mounted() {
    this.refreshTimeline();
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mousemove', this.doDrag);
    const audioPlayer = document.querySelector(".audio-player");
    this.audioPlayer = audioPlayer;
    const audio = new Audio("https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3");
    this.audio = audio;


    audio.addEventListener(
        "loadeddata",
        () => {
          audioPlayer.querySelector(".time").textContent = this.getTimeCodeFromNum(audio.duration);
          audio.volume = .75;
        }
    );

    const timeline = audioPlayer.querySelector(".timeline");
    timeline.addEventListener("click", e => {
      const clickTargetClassList = e.path[0].classList;
      const isTimeline = clickTargetClassList.contains('timeline') || clickTargetClassList.contains('progress');
      if(!isTimeline) return;
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;

      audio.currentTime = timeToSeek;
    });




    const playBtn = audioPlayer.querySelector(".controls .toggle-play");
    playBtn.addEventListener(
        "click",
        () => {
          if (audio.paused) {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
            audio.play();
          } else {
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
            audio.pause();
          }
        },
        false
    );
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.audio-player {
  height: 70px;
  width: 514px;
  background: $clr-blue;
  border-radius: 67px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  padding: 0 54px 0 36px;
  user-select: none;

  .timeline {
    background: change-color(white, $alpha: 0.2);
    width: 235px;
    height: 4px;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin: 0 12px 0 20px;
    .progress {
      background: white;
      width: 0;
      height: 100%;
      //transition: 0.1s;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 8px;
    }
    .track{
      display: block;
      width: 20px;
      height: 20px;
      background-color: white;
      position: absolute;
      //transition: .1s;
      top: 50%;
      left: 0;
      transform: translate(-10px, -50%);
      border-radius: 50%;
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .toggle-play {
      &.play {
        cursor: pointer;
        position: relative;
        left: 0;
        height: 0;
        width: 0;
        border: 7px solid #0000;
        border-left: 13px solid white;
        &:hover {
          transform: scale(1.1);
        }
      }
      &.pause {
        height: 15px;
        width: 20px;
        cursor: pointer;
        position: relative;
        &:before {
          position: absolute;
          top: 0;
          left: 0px;
          background: white;
          content: "";
          height: 15px;
          width: 3px;
        }
        &:after {
          position: absolute;
          top: 0;
          right: 8px;
          background: white;
          content: "";
          height: 15px;
          width: 3px;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .time {
      display: flex;
      font-family: Poppins, sans-serif;
      font-size: 24px;
      width: 60px;

      > * {
        padding: 2px;
      }
    }
    .volume-container {
      cursor: pointer;
      .volume-button {
        height: 26px;
        display: flex;
        align-items: center;
        .volume {
          transform: scale(0.7);
        }
      }

      position: relative;
      z-index: 2;
      .volume-slider {
        position: absolute;
        left: -3px; top: 15px;
        z-index: -1;
        width: 0;
        height: 15px;
        background: white;
        box-shadow: 0 0 20px #000a;
        transition: .25s;
        .volume-percentage {
          background: coral;
          height: 100%;
          width: 75%;
        }
      }
      &:hover {
        .volume-slider {
          left: -123px;
          width: 120px;
        }
      }
    }
  }
}

</style>
