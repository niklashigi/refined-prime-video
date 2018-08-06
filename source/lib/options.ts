import OptionsSync from 'webext-options-sync'

const options = new OptionsSync()

interface Options {
  show_spoilers: 'always' | 'on_hover' | 'never'
}

options.define({
  defaults: {
    show_spoilers: 'on_hover',
  }
})

export default options
