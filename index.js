'use strict';

module.exports = {
  name: 'ember-authenticate-me',

  included: function(app) {
    this._super.included(app);
  },

  config: function(/* environment, appConfig */) {
    return {
      apiNamespace: 'api/v1',

      emberAuthenticateMe: {
        sessionUri: '/api/session',
        passwordResetUri: '/api/password_resets'
      },

      torii: {
        'traditional-authentication': {},
        sessionServiceName: 'session'
      }
    };
  }
};
