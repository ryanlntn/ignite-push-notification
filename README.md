# Ignite Push Notifications Plugin

This plugin add [react-native-push-notification]() to your [Ignite]() React Native project.

## Usage

1. Add the plugin to your project:
```
$ ignite add push-notification
```
2. Update the configuration at `App/Config/PushConfig.js`.
3. Start sending push notifications:
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
