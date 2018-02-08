import screenfull from 'screenfull'

/**
 * Help function to wrap an Layer element in
 * a wrapper formated in the right way.
 *
 * @param {Element} childElement - element to be wraped
 * @param {Number} position - zindex of the element
 */
const wrapElement = function(childElement, position) {
  let wraper = document.createElement('div')
  wraper.style.zIndex = position
  wraper.style.position = 'absolute'
  wraper.style.top = '0'
  wraper.style.left = '0'
  wraper.appendChild(childElement)
  return wraper

}


export default class LayerManager {

  /**
   * @constructor
   * @param {Number} w - width of the Layermanager
   * @param {Number} h - height of the Layermanager
   */
  constructor(w, h) {
    if (!(w && h)) {
      throw new Error('The LayerManager Constructor must be called with width and height')
    }

    this._width = w
    this._height = h
    this._initWidth = w
    this._initHeight = h
    this._domElement = document.createElement('div')
    this._layers = []

    this._domElement.style.position = 'relative'
    this._domElement.style.overflow = 'hidden'
    this._domElement.style.width = w + 'px'
    this._domElement.style.height = h + 'px'

    this._attachEventListener()

  }



  /**
   * Adjust all Layers to the Size of the container of the LayerManager
   */
  adjustToContainer() {
    let parent = window.getComputedStyle(this._domElement.parentNode),
        width = parseInt(parent.width, 10),
        height = parseInt(parent.height, 10)

    this.setSize(width, height)
  }

  /**
   * resize the LayerManager to the given size
   *
   * @param {Number} width - width of the LayerManager in pixel
   * @param {Number} height - height of the LayerManager in pixel
   */
  setSize(width, height) {
    this._width = width
    this._height = height

    this._updateRendering()
  }

  /**
   * Adds the given Layer at the given position (z-index) to
   * the LayerManager
   *
   * @param {Layer} layer - The layer to be added. Must be valid Layer object.
   * @param {Number} position - z-Index for the layer
   */
  add(layer, position) {
    this._layers.push(layer)
    layer._changeSizeTo(this._width, this._height)
    let wraper = wrapElement(layer.getElement(), position)
    this._domElement.appendChild(wraper)
  }

  /**
   * Attaches the container with all Layers inside
   * to a DOM element
   *
   * @param {Element} elem - The DOM element to add the container to
   */
  attachTo(elem) {
    elem.appendChild(this._domElement)
  }

  /**
   * Makes LayerManager go fullscreen
   */
  doFullscreen() {
    if (this.isFullscreen()) {
      //Throw error maybe?
      return
    }
    screenfull.request(this._domElement)
  }

  /**
   * Makes LayerManager exit fullscreen
   */
  exitFullscreen() {
    if (!this.isFullscreen()) {
      //Throw error maybe?
      return
    }
    screenfull.exit()
  }

  /**
   * Returns true if the LayerManager is currently in fullscreen. Otherwise false.
   *
   * @returns {Boolean}
   */
  isFullscreen() {
    return screenfull.isFullscreen && screenfull.element === this._domElement
  }

  /**
   * Returns true if the browser supports fulllscreen. Otherwise false.
   *
   * @returns {Boolean}
   */
  canDoFullscreen() {
    return screenfull.enabled
  }

  /**
   * Gets called internally if the LayerManager exits fullscreen mode
   */
  _onExitFullscreen() {
    this.setSize(this._initWidth, this._initHeight)
  }

  /**
   * Gets called internally if the LayerManager enters fullscreen mode
   */
  _onEnterFullscreen() {
    this.setSize(screen.width, screen.height)
  }

  /**
   * Updates all DOM elements in the LayerManager to have the correct size
   */
  _updateRendering() {
    this._domElement.style.width = this._width + 'px'
    this._domElement.style.height = this._height + 'px'
    this._adjustAll()
  }

  /**
   * Updates all Layers to have the correct size.
   */
  _adjustAll() {
    for (const layer of this._layers) {
      layer._changeSizeTo(this._width, this._height)
    }
  }


  /**
   * Attaches the eventListeners for fullscreen to the document.
   */
  _attachEventListener() {
    if (!screenfull.enabled) {
      return
    }

    document.addEventListener(screenfull.raw.fullscreenchange, () => {
      screenfull.isFullscreen ? 
        this._onEnterFullscreen():
        this._onExitFullscreen()
    })
  }
}

