import * as keys from 'ssb-keys'

export const name = 'keys'
export const version = '0.0.1'

export const manifest = {
  box: 'sync',
  unbox: 'sync',
  sign: 'sync',
  verifiy: 'sync',
}
export const init = () => {
  return {
    box: keys.box,
    unbox: keys.unbox,
    sign: keys.sign,
    verifiy: keys.verifiy
  }
}

