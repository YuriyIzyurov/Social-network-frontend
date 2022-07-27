// @ts-ignore
import ColorThief from "colorthief"
// @ts-ignore
import tinycolor from "tinycolor2"

const rgbToHex = (r:number, g:number, b:number) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')

export const getTwoMainColors = (imgRef: HTMLImageElement | null) => {
    const img = imgRef
    const colorThief = new ColorThief()
    const result = colorThief.getPalette(img, 2, 15)
    const [r1,g1,b1] = result[0]
    const [r2,g2,b2] = result[1]
    const firstColorHex = rgbToHex(r1, g1, b1)
    const secondColorHex = rgbToHex(r2, g2, b2)
    const improvedFirstColor = tinycolor(firstColorHex).saturate(75).toHexString()
    const improvedSecondColor = tinycolor(secondColorHex).saturate(75).toHexString()
    return [improvedFirstColor, improvedSecondColor]
}
