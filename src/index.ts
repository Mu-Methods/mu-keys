import * as keys from 'ssb-keys'
import { derivePath, getPublicKey } from 'ed25519-hd-key'
import * as bip39 from 'bip39'
export const name = 'keyring'
export const version = require('../package.json')
import { ID, KeyApi } from './types'

export const manifest = {
    box: 'sync',
    unbox: 'sync',
    sign: 'sync',
    verify: 'sync',
    loadKeys: 'sync',
    useMnemonic: 'async',
    createMnemonic: 'async',
    createNewKeys: 'sync',
    getKeys: 'sync',
}

export interface Mem {
  seed?: string;
  mnemonic?: string;
  keys: ID[];
}

export const init = (_: unknown, opts: any = {}): KeyApi => {
  const mem: Mem = {
    keys: opts.feedIds || [],
  }

  if (opts.mnemonic) mem.mnemonic = opts.mnemonic
  if(opts.seed) mem.seed = opts.seed

  async function useMnemonic (mnemonic: string): Promise<void> {
    if (!bip39.validateMnemonic(mnemonic)) throw new TypeError('Invalid mnemonic')
    mem.mnemonic = mnemonic
  // @ts-ignore
    mem.seed = await bip39.mnemonicToSeed(mnemonic).toString('hex')
  }

  async function createMnemonic (): Promise<string> {
    const mnemonic = bip39.generateMnemonic()
    // @ts-ignore
    mem.seed = await bip39.mnemonicToSeed(mnemonic).toString('hex')
    return mnemonic
  }

  function createNewKeys (index?: number, mnemonic?: string): ID {
    if (mnemonic) bip39.validateMnemonic(mnemonic)
      // @ts-ignore
    if (!mem.seed && mnemonic) mem.seed =  bip39.mnemonicToSeedSync(mnemonic).toString('hex')
    if (!mem.seed && !mnemonic) throw new Error('Missing mnemonic')
    if (index === undefined) index = mem.keys.reduce((agg, keys): number => {
      if(!keys) return agg
      if (keys.index !== undefined) agg = keys.index + 1
      return agg
    }, 0)
    // @ts-ignore lol typescript
    const seed: string = mnemonic ? bip39.mnemonicToSeedSync(mnemonic).toString('hex') : mem.seed
    // m / purpose' / coin_type' / account' / change / address_index
    const key = derivePath(`m/44'/1389185148'/0'/0'/${index}'`, seed ).key
    const newKeys = {
      curve: 'ed25519',
      // @ts-ignore
      private: `${key.toString('base64')}.ed25519`,
      // @ts-ignore
      public: `${getPublicKey(key).toString('base64')}.ed35519`,
      // @ts-ignore
      id: `@${getPublicKey(key).toString('base64')}.ed35519`,
      index,
    }
    mem.keys.push(newKeys)
    return newKeys
  }



  return {
    box: keys.box,
    unbox: keys.unbox,
    // @ts-ignore: next line (missing in @types) TODO re type this function
    sign: keys.sign,
    // @ts-ignore: next line (missing in @types it is a major version behind) TODO re type this function
    verify: keys.verify,
    loadKeys: (ids: ID[]): ID[] => {
      //@ts-ignore
      mem.keys = [mem.keys, ...ids]
      return mem.keys
    },
    useMnemonic,
    createMnemonic,
    createNewKeys,
    getKeys: function getKeys (): ID[] { return mem.keys },
  }
}