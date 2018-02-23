export default class Layer {
  /**
   * The base class for all built in layers.
   *
   * @constructor
   * @param {Element} element - the element to be wraped in the Layer. Defualts to a new canvas Element
   */
  constructor(element = document.createElement('canvas')) {
    if (element && (!element.tagName)) {
      throw new Error('The parameter passed to the Layer constuctor must be a DOM element.')
    }
    this._element = element
  }


  /**
   * Returns the context of the canvas element
   * in this layer. If this layer does not
   * contain an canvas element an Error is
   * thrown.
   *
   * @param {string} contextType - Passed to HTMLCanvasElement.getContext(). Defaults to '2d'
   * @returns {RenderingContext} see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement.getContext
   */
  getContext(contextType = '2d') {
    if (this._element.tagName !== 'CANVAS') {
      throw new Error('This layer does not contain a canvas, so you can not use getContext.')
    }
    return this._element.getContext(contextType)
  }

  /**
   * Get the element wraped in the layer.
   *
   * @returns {Element} DOM element be used by the Layer. Usually a canvas element.
   */
  getElement() {
    return this._element
  }
}