'use strict';

var Layer = require('./layer.js');
var inherits = require('inherits');

/**
 * Layer that allways exands to the size of the `LayerManager`
 * NOTE: All parameters are passed to the `Layer` construcor.
 *
 * @constructor
 * @augments Layer
 * @param {Element} element - the element to be wraped in the Layer. Defualts to a new canvas Element
 */
var ExpanderLayer = function ExpanderLayer() {
  Layer.apply(this, arguments);
};

inherits(ExpanderLayer, Layer);

ExpanderLayer.prototype._changeSizeTo = function(width, height) {
  this._element.width = width * 2;
  this._element.height = height * 2;
  this._element.style.width = width + 'px';
  this._element.style.height = height + 'px';
};

module.exports = ExpanderLayer;
