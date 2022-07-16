
// @ts-ignore
import tinycolor from "tinycolor2"

const validColorNumber = (number: number) => {
   return number > 255 ? 255 : number < 0 ? 0 : number
}
export const customAvatar = (name: string) => {
   const [r, g, b] = name.slice(0,3).split('').map(elem => validColorNumber(elem.charCodeAt(0)))

   return {
      mainColor: tinycolor({r, g, b}).saturate(65).toHexString(),
      lightColor: tinycolor({r, g, b}).lighten(35).saturate(25).toHexString()
   }
}

