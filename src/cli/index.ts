#!/usr/bin/env node
import * as fs from 'fs'
import { program } from 'commander'
import { MonoAchievement } from '../lib'

program
  .requiredOption('-t, --title <string>', '(required) specify title')
  .requiredOption('-d, --description <string>', '(required) specify description')
  .requiredOption('-i, --image <path>', '(required) specify image path')
  .requiredOption('-o, --output <path>', '(required) path for image to create')
  .option('--bg-top <bg-string>', 'the color of the top of the image')
  .option('--bg-bottom <bg-string>', 'the color of the bottom of the image')
  .option('-c', 'add close button')

program.parse(process.argv)
const options = program.opts()

void (async () => {
  const ma = new MonoAchievement({
    title: options.title,
    description: options.description,
    image: options.image,
    topColor: options.bgTop,
    bottomColor: options.bgBottom,
    closeIcon: options.c
  })

  await ma.load()

  await fs.promises.writeFile(options.output, ma.toBuffer())
})()