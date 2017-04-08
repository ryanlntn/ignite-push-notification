const test = require('ava')
const sinon = require('sinon')
const plugin = require('../plugin')

test('adds the proper npm module and component example', async t => {
  // spy on few things so we know they're called
  const addModule = sinon.spy()
  const addPluginComponentExample = sinon.spy()
  const exists = sinon.stub().returns(false)
  const copy = sinon.spy()

  // mock a context
  const context = {
    ignite: { addModule, addPluginComponentExample },
    filesystem: { exists, copy }
  }

  await plugin.add(context)

  t.true(addModule.calledWith('react-native-push-notification', { link: true }))
  t.true(exists.called)
  t.true(copy.called)
})
