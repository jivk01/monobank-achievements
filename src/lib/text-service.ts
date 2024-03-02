import { Canvas, CanvasPattern, CanvasGradient, CanvasRenderingContext2D } from "canvas";

type TextOptions = {
  fontSize: number,
  fontFamily: string,
  fill: string | CanvasGradient | CanvasPattern,
  textWrap: boolean,
  maxWidth: number,
  align: 'start' | 'center' | 'end',
  lineSpacing: number
}

const defaultTextOptions: TextOptions = {
  fontSize: 46,
  fontFamily: 'Inter Regular',
  fill: 'white',
  textWrap: false,
  maxWidth: 880,
  align: 'center',
  lineSpacing: 10
}

type TextPosition = {
  x: number | 'center',
  y: number | 'center',
}

export class TextService {
  constructor(
    private canvas: Canvas, 
    private ctx: CanvasRenderingContext2D, 
    private width: number, 
    private height: number
  ) {}

  splitToLines(text: string, font: string, maxWidth: number) {
    const words = text.split(" ")
    this.ctx.font = font

    const lines: string[] = [words[0]]
    let i = 0

    for (let j = 1; j < words.length; j++) {
      const word = words[j]
      const newLine = lines[i] + " " + word
      if (this.measureWidth(newLine, font) > maxWidth) {
        lines.push(word)
        i++
      } else {
        lines[i] = newLine
      }
    }

    return lines
  }

  private measureWidth(text: string, font: string) {
    this.ctx.font = font
    return this.ctx.measureText(text).width
  }

  private measureMaxWidth(lines: string[], font: string) {
    return Math.max(...lines.map((line) => this.measureWidth(line, font)))
  }

  drawText(text: string, { x, y }: TextPosition, options?: Partial<TextOptions>) {
    const finalOptions: TextOptions = { ...defaultTextOptions, ...options }
    this.ctx.fillStyle = finalOptions.fill

    const font = `${finalOptions.fontSize}px "${finalOptions.fontFamily}"`
    this.ctx.font = font

    if (finalOptions.textWrap === false) {
      const measurements = this.ctx.measureText(text)
      x = x === 'center' ? (this.width - measurements.width) / 2 : x
      y = y === 'center' ? (this.height + measurements.actualBoundingBoxAscent) / 2 : y += measurements.actualBoundingBoxAscent

      this.ctx.fillText(text, x, y)
    } else {
      const lines = this.splitToLines(text, font, finalOptions.maxWidth)
      const firstLine = lines[0]
      const measurements = this.ctx.measureText(firstLine)
      const maxWidth = Math.min(finalOptions.maxWidth, this.measureMaxWidth(lines, font))
      x = x === 'center' ? (this.width - maxWidth) / 2 : x
      y = y === 'center' ? (this.height + measurements.actualBoundingBoxAscent) / 2 : y + measurements.actualBoundingBoxAscent

      let dy = 0
      for (const line of lines) {
        let dx: number = 0
        const lineWidth = this.measureWidth(line, font)
        if (finalOptions.align === 'center') dx = (maxWidth - lineWidth) / 2
        if (finalOptions.align === 'end') dx = maxWidth - lineWidth

        this.ctx.fillText(line, x + dx, y + dy)
        dy += finalOptions.fontSize + finalOptions.lineSpacing
      }
    }
  }
}