import Layer from './layer'

/**
 * Layer that allways exands to the size of the `LayerManager`
 * NOTE: All parameters are passed to the `Layer` construcor.
 *
 * @constructor
 * @augments Layer
 * @param {Element} element - the element to be wraped in the Layer. Defualts to a new canvas Element
 */
export default class ExpanderLayer extends Layer {
  _changeSizeTo(width, height) {
    this._element.width = width
    this._element.height = height
    this._element.style.width = width + 'px'
    this._element.style.height = height + 'px'
  }
}