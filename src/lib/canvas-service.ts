import { Canvas, createCanvas, CanvasRenderingContext2D, loadImage } from "canvas"
import { TextService } from "./text-service"

export class CanvasService {
  canvas: Canvas
  ctx: CanvasRenderingContext2D

  textService: TextService
  
  constructor(public width: number, public height: number) {
    this.canvas = createCanvas(width, height)
    this.ctx = this.canvas.getContext('2d')

    this.textService = new TextService(this.canvas, this.ctx, width, height)
  }

  createGradient(color1: string, color2: string) {
    const gradient = this.ctx.createLinearGradient(this.width / 2, 0, this.width / 2, this.height)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  async drawImage(x: number, y: number, w: number, h: number, src: string | Buffer) {
    const image = await loadImage(src)
    this.ctx.drawImage(image, x, y, w, h)
  }

  async drawCircleImage(x: number | 'center', y: number | 'center', radius: number, src: string | Buffer) {
    x = x === 'center' ? this.width / 2 : x
    y = y === 'center' ? this.height / 2 : y

    this.ctx.save()

    this.clipCircle(x, y, radius)

    const image = await loadImage(src)
    const aspectRatio = image.width / image.height
    const hsx = radius * Math.max(aspectRatio, 1.0)
    const hsy = radius * Math.max(1.0 / aspectRatio, 1.0)
    this.ctx.drawImage(image, x - hsx, y - hsy, hsx * 2, hsy * 2)

    this.ctx.restore()
  }

  private clipCircle(x: number, y: number, radius: number) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.clip()
  }

  drawTitle(title: string) {
    this.textService.drawText(title, { x: 'center', y: 930 }, {
      fontFamily: 'Inter Bold',
      fontSize: 100,
    })
  }

  drawDescription(description: string) {
    this.textService.drawText(description, { x: 'center', y: 1090 }, {
      textWrap: true
    })
  }
}