var Layer = function Layer(e) {
  if (e && (!e.tagName)) {
    throw new Error("The parameter passed to the Layer constuctor must be a DOM element.");
  }
  this._element = e || document.createElement('canvas');

};

Layer.prototype._changeSizeTo = function(width, height) {
  this._element.width = width * 2;
  this._element.height = height * 2;
  this._element.style.width = width + "px";
  this._element.style.height = height + "px";
};

Layer.prototype.getContext = function(p) {
  if (this._element.tagName !== 'CANVAS') {
    throw new Error("This layer does not contain a canvas, so you can't use getContext.");
  }
  return this._element.getContext(p || '2d');

};
/**
 * returns: DOM element be used by the Layer
 * Usualy a canvas element.
 */
Layer.prototype.getElement = function() {
  return this._element;
};

module.exports = Layer;
