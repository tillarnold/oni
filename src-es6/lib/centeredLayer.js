import Layer from './layer'

/**
 * Layer with fixed size that stays centered in the `LayerManager`
 *
 * @constructor
 * @augments Layer
 * @param {Number} width - fixed width of the element
 * @param {Number} height - fixed height of the element
 * @param {Element} element - the element to be wraped in the Layer. Defualts to a new canvas Element
 */
export default class CenteredLayer extends Layer {
  constructor(width, height, element) {
    super(element)
    this._element.width = width
    this._element.height = height
    this._element.style.width = width + 'px'
    this._element.style.height = height + 'px'
    this._width = width
    this._height = height
  }
  _changeSizeTo(width, height) {
    const parent = this._element.parentElement
    parent.style.top = (height - this._height) / 2 + 'px'
    parent.style.left = (width - this._width) / 2 + 'px'
  }
}