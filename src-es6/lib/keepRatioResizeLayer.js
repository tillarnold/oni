import Layer from './layer'
import {
  gcd
} from './utils'

/**
 * Layer with fixed ratio
 *
 * @constructor
 * @augments Layer
 * @param {Number} width - fixed width of the element
 * @param {Number} height - fixed height of the element
 * @param {Element} element - the element to be wraped in the Layer. Defualts to a new canvas Element
 */
export default class KeepRatioResizingLayer extends Layer {
  constructor(width, height, element) {
    super(element)
    const divisor = gcd(width, height)

    this._width = width / divisor
    this._height = height / divisor
  }
  _changeSizeTo(width, height) {
    const mult = Math.min(Math.floor(width / this._width), Math.floor(height / this._height))

    const nWidth = this._width * mult
    const nHeight = this._height * mult

    this._element.width = nWidth
    this._element.height = nHeight

    const parent = this._element.parentElement
    parent.style.top = (height - nHeight) / 2 + 'px'
    parent.style.left = (width - nWidth) / 2 + 'px'
  }
}