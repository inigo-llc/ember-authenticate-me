import Ember from 'ember';

export function isAuthenticated(session) {
  var authenticated = session.get('content.isAuthenticated');

  return new Ember.RSVP.Promise(function(resolve, reject) {
    if (!authenticated) {
      session.fetch().then((...args) => {
        resolve(...args);
      }).catch((e) => {
        reject(e);
      });
    } else {
      resolve(session);
    }
  });
}

export default Ember.Mixin.create({
  loginRoute: 'login',

  beforeModel: function(transition) {
    const session = this.get('session');

    return isAuthenticated(session).catch(() => {
      Ember.Logger.info("No user session, transitioning to login.");
      const loginController = this.controllerFor('login');

      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    });
  },

  actions: {
    error: function(error, transition) {

      if (error && error.status === 401) {
        const loginController = this.controllerFor('login');

        loginController.set('previousTransition', transition);
        this.get('session').close().then(() => {
          this.transitionTo(this.get('loginRoute'));
        }).catch((error) => {
          Ember.Logger.error(`Error ${error}`);
          this.transitionTo(this.get('loginRoute'));
        });
      }

      return true;
    }
  }
});
