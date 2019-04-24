// Ignite plugin for PushNotification
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-push-notification'
const APP_PATH = process.cwd()
const CONFIG_PATH = `${APP_PATH}/App/Config/PushConfig.js`

const add = async function (context) {
  const { ignite, filesystem } = context

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true })

  // Copy config template
  if (!filesystem.exists(CONFIG_PATH)) {
    filesystem.write(CONFIG_PATH,
`import PushNotification from 'react-native-push-notification'

// https://github.com/zo0r/react-native-push-notification
PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    if (__DEV__) console.log('TOKEN:', token)
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    if (__DEV__) console.log('NOTIFICATION:', notification)
  },

  // ANDROID ONLY: (optional) GCM Sender ID.
  senderID: 'YOUR GCM SENDER ID',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  // Leave this off unless you have good reason.
  popInitialNotification: false,

  /**
    * IOS ONLY: (optional) default: true
    * - Specified if permissions will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    * This example app shows how to best call requestPermissions() later.
    */
  requestPermissions: false
})`)
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
    filesystem.remove(CONFIG_PATH)
  }
}

// Required in all Ignite plugins
module.exports = { add, remove }
