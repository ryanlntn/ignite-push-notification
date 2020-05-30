# Ignite Push Notifications Plugin

This plugin add [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) to your [Ignite](https://github.com/infinitered/ignite) React Native project.

## Usage

1. Add the plugin to your project:
```
$ ignite add push-notification
```
2. Follow manual setup instructions:
    * [iOS](https://github.com/zo0r/react-native-push-notification#ios-manual-installation)
    * [Android](https://github.com/zo0r/react-native-push-notification#android-manual-installation)
3. Update app configuration, depending on your boilerplate: 
    * [Bowser boilerplate](https://github.com/infinitered/ignite-bowser): `app/services/notifications.js`
    * [Andross boilerplate](https://github.com/infinitered/ignite-andross): `App/Config/PushConfig.js`
4. Start sending push notifications:
```js
import PushNotification from 'react-native-push-notification'

PushNotification.localNotification({
  title: "My Notification Title",
  message: "My Notification Message"
})
```

## Contributing

1. Clone this repo
2. Run `npm install`
3. Run `npm test`
4. Check out a branch and make your changes
5. Write tests for those changes
6. Submit a pull request back upstream

## License
This plugin is licensed MIT by Infinite Red, Inc., and was created by Ryan Linton.
