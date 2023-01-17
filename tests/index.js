const test = require('tape')
const plugin = require('../build')
const bip39 = require('bip39')
test('should have exist and qualify spec', async (t) => {
  t.plan(6)
  console.log('plugin', plugin)
  t.ok(plugin, 'plugin is exported')
  t.ok(plugin.name, 'plugin has a name')
  t.ok(plugin.manifest, 'plugin has a manifest')
  t.ok(plugin.version, 'plugin has a version')
  t.ok(plugin.init, 'plugin has an init function')
  t.deepEqual(Object.keys(plugin.manifest), Object.keys(plugin.init()),'plugins init object functions match whats listed in manifest')

  // TO-DO's tests:

  // createMnemonic: should generate a valid mnemonic

  // useMnemonic && createNewKeys: should use the correct mnemonic to create the correct keys

  // createNewKeys: should create keys with next index




})