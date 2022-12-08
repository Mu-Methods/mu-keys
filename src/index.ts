export const name = 'my-plugin'
export const version = '0.0.1'

export const manifest = {
  helloWorld: 'sync'
}
export const init = () => {
  return {
    helloWorld: () => console.log('Hello World')
  }
}

