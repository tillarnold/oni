import {
  LayerManager,
  ExpanderLayer,
  CenteredLayer,
  KeepRatioDisplayLayer,
  KeepRatioResizeLayer
} from '../index.js'
let canvasUtils = require('canvas-utils')


require('insert-css')(`
  *{
    outline:#000 solid 1px;
    margin: 0;
    padding 0;
  }
  body, html {
    overflow: hidden;
    height: 100vh;
    widht: 100vw;
  }
`)


let lm = new LayerManager(300, 400)
let l1 = new ExpanderLayer()
let l2 = new ExpanderLayer()
let l3 = new CenteredLayer(100, 100)
let l4 = new KeepRatioResizeLayer(1920, 1080)
let l5 = new KeepRatioDisplayLayer(400, 200)

let cee = canvasUtils.createCanvasEventEmitter(l1.getElement())
cee.on('mousemove', function(e) {
  let ctx = l1.getContext()
  ctx.fillStyle = 'purple'
  ctx.fillRect(e.x - 5, e.y - 5, 10, 10)
})


canvasUtils.createCanvasEventEmitter(l5.getElement()).on('mousemove', function(e) {
  let ctx = l5.getContext()
  ctx.fillStyle = 'rgba(100,100,100,0.1)'
  ctx.fillRect(e.x - 5, e.y - 5, 10, 10)
})

lm.attachTo(document.body)

lm.adjustToContainer()
lm.add(l1, 1)
lm.add(l2, 2)
lm.add(l3, 3)
lm.add(l4, 4)
lm.add(l5, 5)

function paint() {
  l2.getContext().fillStyle = 'red'
  l2.getContext().fillRect(15, 20, 30, 40)
  l1.getContext().fillRect(10, 10, 30, 30)
  l3.getContext().fillStyle = 'blue'
  l3.getContext().fillRect(25, 25, 50, 50)
  l5.getContext().fillStyle = 'maroon'
  l5.getContext().fillRect(25, 25, 50, 50)
}

paint()


function debounce(func, wait) {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(arguments), wait)
  }
}

window.addEventListener('resize', debounce(() => {
  console.log('resize', screen)
  lm.adjustToContainer()
}, 100))

document.body.addEventListener('dblclick', function() {
  lm.doFullscreen()
})