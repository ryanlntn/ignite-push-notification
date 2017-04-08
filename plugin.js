// Ignite plugin for PushNotification
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-push-notification'
const PLUGIN_PATH = __dirname
const APP_PATH = process.cwd()

const add = async function (context) {
  const { ignite, filesystem } = context

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true })

  // Copy config template
  if (!filesystem.exists(`${APP_PATH}/App/Config/PushConfig.js`)) {
    filesystem.copy(`${PLUGIN_PATH}/templates/PushConfig.js`, `${APP_PATH}/App/Config/PushConfig.js`)
  }
}

const remove = async function (context) {
  const { ignite, filesystem } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  // Prompt for removal of config
  const removePushNotification = await context.prompt.confirm(
    'Do you want to remove App/Config/PushConfig.js?'
  )

  if (removePushNotification) {
    filesystem.remove(`${APP_PATH}/App/Config/PushConfig.js`)
  }
}

// Required in all Ignite plugins
module.exports = { add, remove }
