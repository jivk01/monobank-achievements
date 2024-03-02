# About
This is a small package for creating
[Monobank](https://en.wikipedia.org/wiki/Monobank)-like achievement images

# Installation

## From npm
As a dependence:
```shell
$ npm i mono-achievements
```
Globally:
```shell
$ npm i -g mono-achievements
```

## From source code
1. Copy source code from the [repo](https://github.com/jivk01/monobank-achievements)
2. Install dependecies with `npm i`
3. Build package with `npm run build`
4. Next, install package globally using `npm link`

To install package as a dependence, go to your project's directory and execute following command: `npm link mono-achievements`

# Usage
## In your project
```ts
import { MonoAchievement } from 'mono-achievements'

void (async () => {
  const achievement = new MonoAchievement({
    topColor: '#EEAA22',
    bottomColor: 'rgb(230, 40, 20)',
    title: 'Lorem ipsum',
    description: 'Dolor sit amet, ... mauris',
    image: 'path/to/your/image.png',
    closeIcon: true
  })

  await achievement.load()
  const buffer = achievement.toBuffer()
  // Then you can save image with fs
})()
```
## CLI
CLI equivalent:
```shell
$ mono --bg-top "#EEAA22" --bg-bottom "rgb(230, 40, 20)" -t "Lorem ipsum" -d "Dolor sit amet, ... mauris" -i "path/to/your/image.png" -c -o image.png
```

# Properties
| Property | type | description |
| --- | --- | --- |
| title | string | achievement title (up to 16 characters) |
| description | string | achievement description (up to 160 characters) |
| image | string \| Buffer | path to the image or it's Buffer |
| topColor | string? | css-like color declaration, default: 'blue' |
| bottomColor | string? | css-like color declaration, default: 'yellow' |
| closeIcon | boolean? | default: false |