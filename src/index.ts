import * as keys from 'ssb-keys'

export const name = 'keys'
export const version = '0.0.1'

export const manifest = {
  box: 'sync',
  unbox: 'sync',
  sign: 'sync',
  verify: 'sync',
}
export const init = () => {
  return {
    box: keys.box,
    unbox: keys.unbox,
    // @ts-ignore: next line (missing in @types) TODO re type this function
    sign: keys.sign,
    // @ts-ignore: next line (missing in @types it is a major version behind) TODO re type this function
    verify: keys.verify
  }
}

