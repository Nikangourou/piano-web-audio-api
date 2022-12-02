import Key from '../notes/Key'

class Game {
  #squares: {}[] = []
  canvas = document.querySelector('canvas')  
  ctx = this.canvas!.getContext('2d')
  width = window.innerWidth
  widthColumn = this.width / 10
  height = window.innerHeight
  columns = [[], [], [], [], [], [], [], [], [], []]
  score = 0
  bestScore = 0

  constructor() {}

  keyPress = (e: KeyboardEvent) => {
    let column = 0
    switch (e.key) {
      case 'a':
        column = 0
        break
      case 'z':
        column = 1
        break
      case 'e':
        column = 2
        break
      case 'r':
        column = 3
        break
      case 't':
        column = 4
        break
      case 'y':
        column = 5
        break
      case 'u':
        column = 6
        break
      case 'i':
        column = 7
        break
      case 'o':
        column = 8
        break
      case 'p':
        column = 9
        break
    }

    this.ctx?.clearRect(0, this.height - 100, this.width, 100)
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(column * this.widthColumn, this.height - 100, this.widthColumn, this.height)

    // first id
    const lastId = this.columns[column][0]

  
    if (lastId) {
      this.#squares = this.#squares.filter((square) => square.id !== lastId)
      this.columns[column].shift()
      this.score += 5
    }else{
      this.score -= 5

      const partitionEnd = [50, 100, 120, 150, 200]

      for (const note of partitionEnd) {
        this.playNote(note)
      }
    }
  }

  init = () => {
    const score = document.querySelector('.section_score')
    if (!score) throw new Error("score wasn't found in dom")
    score.innerHTML = 'Score: '+this.score

    // const bestScore = document.querySelector('.section_bestScore')
    // if (!bestScore) throw new Error("bestScore wasn't found in dom")
    // bestScore!.innerHTML = 'Best Score: '+this.bestScore

    let gradient = this.ctx.createLinearGradient(0, 0, 0, this.height)
    gradient.addColorStop(0, '#46CEED')
    gradient.addColorStop(1, '#A27AEE')

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.width, this.height - 100)

    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, this.height - 100, this.width, 2)
    this.ctx.fillRect(0, this.height - 2, this.width, 2)

    // draw 10 columns on the width canvas
    for (let i = 0; i <= this.width; i += this.widthColumn) {
      this.ctx.fillRect(i, 0, 2, this.height)
    }
  }

  draw = (keys: Key[]) => {
    if (!this.canvas) throw new Error("canvas wasn't found in dom")

    for (const key of keys) {
      // switch column en fonction de la frequence
      let column = 0

      if (key.frequency < 28) {
        column = 0
      } else if (key.frequency < 48) {
        column = 1
      } else if (key.frequency < 85) {
        column = 2
      } else if (key.frequency < 150) {
        column = 3
      } else if (key.frequency < 270) {
        column = 4
      } else if (key.frequency < 450) {
        column = 5
      } else if (key.frequency < 330) {
        column = 6
      } else if (key.frequency < 800) {
        column = 7
      } else if (key.frequency < 1300) {
        column = 8
      } else {
        column = 9
      }

      const uniqueId = Math.random().toString(36).substr(2, 9)
      this.columns[column].push(uniqueId)

      this.#squares.push({
        x: column * this.widthColumn,
        y: 0 - 30 * (key.beat * 0.3) + 80,
        width: this.widthColumn,
        height: 30 * (key.beat * 0.3),
        id: uniqueId,
      })
    }
  }

  drawSquare = () => {
    if (!this.ctx) throw new Error("ctx wasn't found in dom")
    this.init()

    for (const square of this.#squares) {
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(square.x, square.y, square.width, square.height)
    }
  }

  downSquare = () => {
    for (const square of this.#squares) {
      square.y += this.height / 1000
      if (square.y > this.height - 100) {
        // play sound

        const partitionEnd = [100, 120, 150, 170, 190, 200, 250]

        // clear all squares
        this.#squares = []
        this.columns = [[], [], [], [], [], [], [], [], [], []]

        for (const note of partitionEnd) {
          this.playNote(note)
        }
        this.score -= 100
      }
    }
  }

  playNote = (note: number) =>
    new Promise<void>((resolve) => {
      const audioContext = new AudioContext()

      const oscillator = new OscillatorNode(audioContext)
      const gain = new GainNode(audioContext)

      const noteDuration = 1

      oscillator.connect(gain)
      oscillator.type = 'triangle'
      oscillator.frequency.value = note

      gain.connect(audioContext.destination)
      gain.gain.setValueAtTime(0, audioContext.currentTime)
      gain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01)
      gain.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + noteDuration - 0.01,
      )

      oscillator.start(audioContext.currentTime),
        setTimeout(() => {
          oscillator.stop(0)
          oscillator.disconnect()

          resolve()
        }, noteDuration * 1000)
    })

    getScore = () => {
      return this.score
    }

    setBetsScore = (score: number) => {
      this.bestScore = score
    }

    resetScore = () => {
      this.score = 0
    }
}

export default new Game()
