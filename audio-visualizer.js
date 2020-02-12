// *** Global Variables ***
// Audio variables
const playButton = document.getElementById("button-play")
let analyser
let frequencyArray

// Canvas variables
const canvas1 = document.getElementById("canvas-1")
const canvas2 = document.getElementById("canvas-2")
const canvas3 = document.getElementById("canvas-3")
const ctx1 = canvas1.getContext("2d")
const ctx2 = canvas2.getContext("2d")
const ctx3 = canvas3.getContext("2d")

// console.log(ctx1, ctx2, ctx3)

const centerX = 300 / 2
const centerY = 300 / 2
const radius = 300 / 5

// Functionality for audio button
function startAudio() {
  const audio = new Audio()
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  audio.src = "accoustic-guitar.mp3"

  analyser = audioContext.createAnalyser()
  const source = audioContext.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioContext.destination)
  frequencyArray = new Uint8Array(analyser.frequencyBinCount)

  audio.play()

  console.log(ctx1)
  render(ctx1, "#65A65D")
  render(ctx2, "#AE4237")
  render(ctx3, "#DFB856")
}

// Add event listener for audio button
playButton.addEventListener("click", (e) => {
  startAudio()
})

// Render canvases 
function render(ctx, color) {

  console.log(ctx, color)

  ctx.clearRect(0, 0, 300, 300)
  ctx.beginPath()
  // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  // ctx.strokeStyle = "red"
  // ctx.stroke()

  const bars = 200
  const step = Math.PI * 2 / bars

  analyser.getByteFrequencyData(frequencyArray)

  frequencyArray.forEach((f, i) => {
    const barLength = frequencyArray[i] * 0.5
    const x1 = (Math.cos(step * i) * radius) + centerX
    const y1 = (Math.sin(step * i) * radius) + centerY
    const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
    const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

    ctx.strokeStyle = color
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
   })

  ctx.stroke()

  requestAnimationFrame(() => {
    render(ctx, color)
  })
}
