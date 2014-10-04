var screenfull = require('screenfull');

/**
 * Help function to wrap an Layer element in
 * a wrapper formatet in teh right way.
 */
var wrapElement = function(childElement, position) {
  var wraper = document.createElement('div');
  wraper.style.zIndex = position;
  wraper.style.position = 'absolute';
  wraper.style.top = '0';
  wraper.style.left = '0';
  wraper.appendChild(childElement);
  return wraper;

};

var LayerManager = function LayerManager(w, h) {

  if (!(w && h)) {
    throw new Error('The LayerManager Constructor must be called with width and height');
  }

  this._width = w;
  this._height = h;
  this._initWidth = w;
  this._initHeight = h;
  this._domElement = document.createElement('div');
  this._layers = [];

  this._domElement.style.position = "relative";
  this._domElement.style.overflow = "hidden";
  this._domElement.style.width = w + "px";
  this._domElement.style.height = h + "px";

  this._attachEventListener();
};


LayerManager.prototype.adjustToContainer = function() {
  this._width = parseInt(window.getComputedStyle(this._domElement.parentNode).width);
  this._height = parseInt(window.getComputedStyle(this._domElement.parentNode).height);

  this._updateRendering();

};

/**
 * Adds the given Layer at the given position (z-index) to
 * the LayerManager
 *
 * layer: The layer to be added.
 * Must be valid Layer object.
 *
 * position: z-Index for the layer
 */
LayerManager.prototype.add = function(layer, position) {
  this._layers.push(layer);
  layer._changeSizeTo(this._width, this._height);
  var wraper = wrapElement(layer.getElement(), position);
  this._domElement.appendChild(wraper);
};

/**
 * Attaches the container with all Layers inside
 * to a DOM element
 *
 * elem: The DOM element to add the container to
 */
LayerManager.prototype.attachTo = function(elem) {
  elem.appendChild(this._domElement);
};

/**
 * Makes LayerManager go fullscreen
 */
LayerManager.prototype.doFullscreen = function() {
  if (this.isFullscreen()) {
    //Throw error maybe?
    return;
  }
  screenfull.request(this._domElement);
};

LayerManager.prototype.exitFullscreen = function() {
  if (!this.isFullscreen()) {
    //Throw error maybe?
    return;
  }
  screenfull.exit();
};

LayerManager.prototype.isFullscreen = function() {
  return screenfull.isFullscreen && screenfull.element === this._domElement;
};

LayerManager.prototype.canDoFullscreen = function() {
  return screenfull.enabled;
};





/**
 * Gets called internally if the LayerManager exits fullscreen mode
 */
LayerManager.prototype._onExitFullscreen = function() {
  this._width = this._initWidth;
  this._height = this._initHeight;
  this._updateRendering();
};

/**
 * Gets called internally if the LayerManager enters fullscreen mode
 */
LayerManager.prototype._onEnterFullscreen = function() {
  this._width = screen.width;
  this._height = screen.height;
  this._updateRendering();
};

/**
 * Updates all DOM elements in the LayerManager to have the correct size
 */
LayerManager.prototype._updateRendering = function() {
  this._domElement.style.width = this._width + "px";
  this._domElement.style.height = this._height + "px";
  this._adjustAll();
};

/**
 * Updates all Layers to have the correct size.
 */
LayerManager.prototype._adjustAll = function() {
  for (var i = 0; i < this._layers.length; i++) {
    this._layers[i]._changeSizeTo(this._width, this._height);
  }
};


/**
 * Attaches the needed eventListeners to the document
 */
LayerManager.prototype._attachEventListener = function() {
  var that = this;
  if (screenfull.enabled) {
    document.addEventListener(screenfull.raw.fullscreenchange, function() {
      if (screenfull.isFullscreen) {
        that._onEnterFullscreen();
      } else {
        that._onExitFullscreen();
      }
    });
  }
};


module.exports = LayerManager;
