<template>
  <div>
    <canvas
      ref="canvas"
      class="canvas"
    ></canvas>
  </div>
</template>

<script>
  import jsQR from "jsqr"
  import Jimp from "jimp"

  export default {
    name: "c-scan",
    data() {
      return {
        audio: null,
        video: null,
        canvas: null,
        canvas2d: null,
        animation: true,
        imgUrl: null,
        timer: null,
        result: null
      }
    },
    mounted() {
      this.audio = new Audio("tone.mp3")
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
      cancel() {
        this.animation = false
        cancelAnimationFrame(this.timer)
        setTimeout(() => this.canvas.style.display = "none", 1000)
      },
      sweep() {
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
          const { videoWidth, videoHeight } = this.video
          this.canvas.width = videoWidth
          this.canvas.height = videoHeight
          this.canvas2d.drawImage(this.video, 0, 0, videoWidth, videoHeight)
          try {
            const img = this.canvas2d.getImageData(0, 0, videoWidth, videoHeight)
            this.imgUrl = img
            const obj = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" })
            if (obj) {
              const loc = obj.location
              this.draw(loc.topLeftCorner, loc.topRightCorner)
              this.draw(loc.topRightCorner, loc.bottomRightCorner)
              this.draw(loc.bottomRightCorner, loc.bottomLeftCorner)
              this.draw(loc.bottomLeftCorner, loc.topLeftCorner)
              if (this.result != obj.data) {
                this.audio.play()
                this.result = obj.data
                this.cancel()
                console.info("识别结果：", obj.data)
              }
            } else {
              console.error("识别失败，请检查二维码是否正确！")
            }
          } catch (err) {
            console.error("识别失败，请检查二维码是否正确！", err)
          }
        }
        if (this.animation) {
          this.timer = requestAnimationFrame(() => this.sweep())
        }
      },
      media() {
        this.animation = true
        this.canvas.style.display = "block"
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
          navigator.msGetUserMedia
        if (navigator.mediaDevices) {
          navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
            this.video.srcObject = stream
            this.video.setAttribute("playsinline", true)
            this.video.setAttribute("webkit-playsinline", true)
            this.video.addEventListener("loadedmetadata", () => {
              this.video.play()
              this.sweep()
            })
          }).catch((error) => {
            this.cancel()
            alert('对不起：未识别到扫描设备!')
            console.log(error.code + "：" + error.name + "，" + error.message)
          })
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia({ video: { facingMode: "environment" } }, (stream) => {
            this.video.srcObject = stream
            this.video.setAttribute("playsinline", true)
            this.video.setAttribute("webkit-playsinline", true)
            this.video.addEventListener("loadedmetadata", () => {
              this.video.play()
              this.sweep()
            })
          }, (error) => {
            this.cancel()
            alert('对不起：未识别到扫描设备!')
            console.log(error.code + "：" + error.name + "，" + error.message)
          })
        } else {
          if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf("https://") < 0) {
            console.log("获取浏览器录音功能，因安全性问题，需要在localhost 或 127.0.0.1 或 https 下才能获取权限！")
          } else {
            this.cancel()
            alert("对不起：未识别到扫描设备!")
          }
        }
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
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
