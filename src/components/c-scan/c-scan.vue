<template>
  <div>
    <van-overlay
      :show="show"
      z-index="99999"
      @click="cancel"
    >
      <canvas
        ref="canvas"
        class="canvas"
      ></canvas>
    </van-overlay>
  </div>
</template>

<script>
  import jsqr from "jsqr"
  import qs from "qs"

  export default {
    name: "c-scan",
    data() {
      return {
        show: false,
        audio: null,
        video: null,
        facingMode: "environment",
        canvas: null,
        canvas2d: null,
        animation: true,
        mediaStream: null,
        timer: null
      }
    },
    mounted() {
      this.audio = new Audio("static/tone.mp3")
      this.video = document.createElement("video")
      this.canvas = this.$refs.canvas
      this.canvas2d = this.canvas.getContext("2d")
    },
    methods: {
      draw(begin, end) {
        this.canvas2d.beginPath()
        this.canvas2d.moveTo(begin.x, begin.y)
        this.canvas2d.lineTo(end.x, end.y)
        this.canvas2d.lineWidth = 3
        this.canvas2d.strokeStyle = "red"
        this.canvas2d.stroke()
      },
      scan() {
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
          const { videoWidth, videoHeight } = this.video
          this.canvas.width = videoWidth
          this.canvas.height = videoHeight
          this.canvas2d.drawImage(this.video, 0, 0, videoWidth, videoHeight)
          try {
            let img = this.canvas2d.getImageData(0, 0, videoWidth, videoHeight)
            let qr = jsqr(img.data, img.width, img.height, { inversionAttempts: "dontInvert" })
            if (qr) {
              let loc = qr.location
              this.draw(loc.topLeftCorner, loc.topRightCorner)
              this.draw(loc.topRightCorner, loc.bottomRightCorner)
              this.draw(loc.bottomRightCorner, loc.bottomLeftCorner)
              this.draw(loc.bottomLeftCorner, loc.topLeftCorner)
              this.audio.play()
              this.cancel()
              this.$emit('result', qr.data)
            } else {
              console.error("无法识别二维码！")
            }
          } catch (err) {
            console.error("无法识别二维码！", err)
          }
        }
        if (this.animation) {
          this.timer = requestAnimationFrame(this.scan)
        }
      },
      media() {
        this.show = true
        this.animation = true
        this.canvas.style.display = "block"
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia || navigator.msGetUserMedia
        let scan = (stream) => {
          this.video.srcObject = stream
          this.video.setAttribute("playsinline", true)
          this.video.setAttribute("webkit-playsinline", true)
          this.video.addEventListener("loadedmetadata", () => {
            this.video.play()
            this.scan()
          })
          this.mediaStream = typeof stream.stop === 'function' ? stream : stream.getTracks()[0]
        }
        let fail = (error) => {
          console.log(error)
          this.cancel()
          this.$notify('未识别到扫描设备！')
        }
        if (navigator.mediaDevices) {
          navigator.mediaDevices.getUserMedia({ video: { facingMode: this.facingMode } })
            .then(scan).catch(fail)
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia({ video: { facingMode: this.facingMode } }, scan, fail)
        } else {
          this.cancel()
          this.$notify('未识别到扫描设备！')
        }
      },
      cancel() {
        this.show = false
        this.mediaStream && this.mediaStream.stop()
        this.animation = false
        cancelAnimationFrame(this.timer)
        setTimeout(() => this.canvas.style.display = "none", 1000)
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .scanner {
    position: fixed;
    z-index: 999999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .canvas {
    display: none;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
