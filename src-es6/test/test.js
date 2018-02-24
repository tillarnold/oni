import {
  LayerManager,
  ExpanderLayer,
  CenteredLayer
} from '../index.js'
let canvasUtils = require('canvas-utils')


require('insert-css')('*{outline:#000 solid 1px}')


let lm = new LayerManager(300, 400)
let l1 = new ExpanderLayer()
let l2 = new ExpanderLayer()
let l3 = new CenteredLayer(100, 100)

let cee = new canvasUtils.createCanvasEventEmitter(l1.getElement())
cee.on('mousemove', function(e) {
  let ctx = l1.getContext()
  ctx.fillStyle = 'purple'
  ctx.fillRect(e.x, e.y, 10, 10)
})

lm.attachTo(document.body)

lm.adjustToContainer()
lm.add(l1, 1)
lm.add(l2, 2)
lm.add(l3, 3)

function paint() {
  l2.getContext().fillStyle = 'red'
  l2.getContext().fillRect(15, 20, 30, 40)
  l1.getContext().fillRect(10, 10, 30, 30)
  l3.getContext().fillStyle = 'blue'
  l3.getContext().fillRect(25, 25, 50, 50)
}

paint()



document.body.addEventListener('click', function() {
  lm.doFullscreen()
})