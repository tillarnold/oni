let LayerManager = require('../index.js').LayerManager
let ExpanderLayer = require('../index.js').ExpanderLayer
let canvasUtils = require('canvas-utils')


require('insert-css')('*{outline:#000 solid 1px}')


let lm = new LayerManager(300, 400)
let l1 = new ExpanderLayer()
let l2 = new ExpanderLayer()

let cee = new canvasUtils.createCanvasEventEmitter(l1.getElement())
cee.on('mousemove', function(e) {
  l1.getContext().fillRect(e.x, e.y, 10, 10)
})

lm.attachTo(document.body)

lm.adjustToContainer()
lm.add(l1, 1)
lm.add(l2, 2)

function paint() {
  l2.getContext().fillStyle = 'red'
  l2.getContext().fillRect(15, 20, 30, 40)
  l1.getContext().fillRect(10, 10, 30, 30)
}

paint()



document.body.addEventListener('click', function() {
  lm.doFullscreen()
})
