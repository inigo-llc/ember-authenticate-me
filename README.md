# Ember-authenticate-me

This addon hooks [Torii](https://github.com/Vestorly/torii) up to work out of the box with the Rails gem [token-authenticate-me](https://github.com/inigo-llc/token_authenticate_me) and includes some default templates, routes, and controllers.

## Installation (requires ember-cli 2.11.0 or greater and ember-cli-htmlbars 1.1.1 or greater)

In your app's root Ember directory (typically `app-ember`), run:

* `ember install ember-authenticate-me`

`ember g ember-authenticate-me` adds to your `app/router.js` router map:

```js
this.route('login');
this.route('logout');
this.route('sign-up');
this.route('forgot-password');

this.route('reset-password', {
  path: '/reset-password/:token'
});

this.route('edit-account', {
  path: '/edit-account/:user_id'
});
```

---

### Include Default CSS Styling

To include default css styling, add the following to your ember-cli projects `Brocfile.js`:
```js

var app = new EmberApp({
  emberAuthenticateMe: {
      importCSS: true
    },
  ...
]);
```
---

### Override default login transitions
override the `app/controllers/login.js` controller to:
```
import LoginController from 'ember-authenticate-me/controllers/login';

export default LoginController.extend({
  transitionRoute: /* route name here, I.E. 'foo' */

  transitionToLoggedInRoute: function(sessionContent) {
    /*
     * Or to dynamically control the transition
     * implement this function here and manually
     * call `this.transitionToRoute(...);
     */
  }
});
```

### Watching session lifecycle events
An example on adding user context to sentry.
`app/instance-initializers/sentry.js`
```js
export function initialize(applicationInstance) {
  const sessionLifecycle = applicationInstance.lookup('service:session-lifecycle');

  sessionLifecycle.registerLoginCallback((session) => {
    if (!Ember.isBlank(session.currentUser)) {
      Raven.setUserContext({ email: session.currentUser.get('email'), id: session.currentUser.get('id') });
    }
  });

  sessionLifecycle.registerLogoutCallback((session) => {
    Raven.setUserContext();
  });
}
```

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

---

## Code Of Conduct
Wildland Open Source [Code Of Conduct](https://github.com/wildland/code-of-conduct)
