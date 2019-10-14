// Ignite plugin for PushNotification
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = "react-native-push-notification";
const NPM_MODULE_VERSION = "^3.1.9";
const APP_PATH = process.cwd();

const ANDROSS_CONFIG_PATH = `${APP_PATH}/App/Config/PushConfig.js`;
const ANDROSS_CONFIG = `import PushNotification from 'react-native-push-notification'

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
})`;

const BOWSER_SERVICE_PATH = `${APP_PATH}/app/services/notifications.js`;
const BOWSER_SERVICE = `import { PushNotificationIOS } from "react-native"
import PushNotification from "react-native-push-notification"
import { any, values } from "ramda"

/**
 * The notification service.
 */
export class Notifications {
  constructor() {
    this.updatePushToken = () => {}
    this.onNotificationCallback = () => {}
  }

  /**
   * Logs something thru Reactotron.
   *
   * @param topic The subject of the log event.
   * @param value The value to log.
   */
  log(topic, value) {
    __DEV__ &&
      console.tron &&
      console.tron.display({
        name: "NOTIFICATIONS",
        preview: topic,
        value,
      })
  }

  /**
   * Setup push notifications
   */
  setup(analytics) {
    // configure push notifications
    PushNotification.configure({
      // Called when Token is generated (iOS and Android)
      onRegister: notification => {
        this.log("token", notification.token)
        this.updatePushToken(notification.token)
      },

      // Called when a remote or local notification is opened or received
      onNotification: notification => {
        this.log("notification", notification)

        // forward to handler
        this.onNotificationCallback(notification)

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },

      // Android FCM Sender ID
      senderID: "<Your ID Here>",

      // Request permissions on first app load?
      requestPermissions: true,
    })

    // Log registration errors
    __DEV__ && PushNotificationIOS.addEventListener("registrationError", console.tron.log)
  }

  /**
   * Setup the notification handler.
   *
   * @param callback The notification handler.
   */
  onNotification(callback) {
    this.onNotificationCallback = callback
  }

  /**
   * Check what notifications are permitted
   */
  static async checkPermissions() {
    return await new Promise(resolve => {
      PushNotification.checkPermissions(permissions => {
        resolve(any(Boolean)(values(permissions)) ? "authorized" : "denied")
      })
    })
  }

  /**
   * Request notification permissions
   */
  static async requestPermissions() {
    return await new Promise(resolve => {
      PushNotification.requestPermissions(permissions => {
        resolve(any(Boolean)(values(permissions)) ? "authorized" : "denied")
      })
    })
  }

  /**
   * Register for remote notifications. Assumes authorized. Get a new push token.
   */
  register() {
    PushNotification.registerForRemoteNotifications()
  }

  /**
   * Send a local notification. Message prop required.
   * See https://github.com/zo0r/react-native-push-notification#local-notifications for options.
   */
  localNotification(args) {
    PushNotification.localNotification(args)
  }

  /**
   * Set the badge number indicating number of unread notifications.
   */
  setApplicationIconBadgeNumber(n) {
    PushNotification.setApplicationIconBadgeNumber(n)
  }
}`;

const add = async function(context) {
  const { ignite, filesystem } = context;
  const boilerplateName = ignite.boilerplateName();

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, {
    link: true,
    version: NPM_MODULE_VERSION
  });

  // Copy config template
  if (boilerplateName === "ignite-andross") {
    if (!filesystem.exists(ANDROSS_CONFIG_PATH)) {
      filesystem.write(ANDROSS_CONFIG_PATH, ANDROSS_CONFIG);
    }
  } else if (boilerplateName === "ignite-bowser") {
    if (!filesystem.exists(BOWSER_SERVICE_PATH)) {
      filesystem.write(BOWSER_SERVICE_PATH, BOWSER_SERVICE);
    }
  }
};

const remove = async function(context) {
  const { ignite, filesystem } = context;
  const boilerplateName = ignite.boilerplateName();

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true });

  if (ignite.boilerplateName() === "ignite-andross") {
    // Prompt for removal of config
    const removePushNotification = await context.prompt.confirm(
      "Do you want to remove App/Config/PushConfig.js?"
    );

    if (removePushNotification) {
      filesystem.remove(ANDROSS_CONFIG_PATH);
    }
  } else if (boilerplateName === "ignite-bowser") {
    // Prompt for removal of service
    const removeNotifications = await context.prompt.confirm(
      "Do you want to remove app/services/notifications.js"
    );

    if (removeNotifications) {
      filesystem.remove(BOWSER_SERVICE_PATH);
    }
  }
};

// Required in all Ignite plugins
module.exports = { add, remove };
