const test = require('tape')
const plugin = require('../build')

test('should have exist and qualify spec', async (t) => {
  t.plan(5)
  console.log('plugin', plugin)
  t.ok(plugin, 'plugin is exported')
  t.ok(plugin.name, 'plugin has a name')
  t.ok(plugin.manifest, 'plugin has a manifest')
  t.ok(plugin.version, 'plugin has a version')
  t.ok(plugin.init, 'plugin has an init function')
})