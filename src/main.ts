import addPresetSongs from '../public/js/presetSongs/presetSongs'
import Game from './game/Game'


document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (!app) throw new Error("app wasn't found in dom")
  addPresetSongs()

  const canvas = document.querySelector('canvas')
  if (!canvas) throw new Error("canvas wasn't found in dom")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  Game.init()

  // // post score to database
	// const data = {tile: 'hello', score: 43}
	// const options = {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(data)
	// }
	// fetch('http://localhost:8081/api', options)
})
