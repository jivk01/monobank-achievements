import * as path from 'path'

import { registerFont } from 'canvas'
import { CanvasService } from './canvas-service'

registerFont(path.resolve(__dirname, '../../assets/Inter-Bold.ttf'), { family: 'Inter Bold' })
registerFont(path.resolve(__dirname, '../../assets/Inter-Regular.ttf'), { family: 'Inter Regular' })

export class MonoAchievement {
  canvasService: CanvasService = new CanvasService(1000, 1440)

  #title: string
  #description: string
  #topColor: string = 'blue'
  #bottomColor: string = 'yellow'
  #closeIcon: boolean = false
  #image: string | Buffer

  #loaded: boolean = false

  constructor(options: {
    title: string,
    description: string,
    topColor?: string,
    bottomColor?: string,
    image: string | Buffer,
    closeIcon?: boolean
  }) {
    if (options.title.length > 16) throw new RangeError('Title is too big (24 characters allowed)')
    this.#title = options.title

    if (options.description.length > 160) throw new RangeError('Description is too big (120 characters allowed)')
    this.#description = options.description

    this.#topColor = options.topColor ? options.topColor : this.#topColor
    this.#bottomColor = options.bottomColor ? options.bottomColor : this.#bottomColor

    this.#closeIcon = typeof options.closeIcon === 'boolean' ? options.closeIcon : false

    this.#image = options.image
  }

  async load() {
    this.canvasService.createGradient(this.#topColor, this.#bottomColor)
    await this.canvasService.drawCircleImage('center', 480, 350, this.#image)
    this.canvasService.drawTitle(this.#title)
    this.canvasService.drawDescription(this.#description)

    if (this.#closeIcon) {
      this.canvasService.drawImage(48, 48, 48, 48, path.resolve(__dirname, '../../assets/close.png'))
    }

    this.#loaded = true
  }

  toBuffer() {
    if (!this.#loaded) {
      throw new Error('Cannot export image before load')
    }
    return this.canvasService.canvas.toBuffer()
  }
}