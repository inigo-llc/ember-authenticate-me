import Ember from 'ember';
import DS from 'ember-data';

const { get } = Ember;

export default DS.ActiveModelSerializer.extend({
  attrs: {
    createdAt: { serialize: false },
    updatedAt: { serialize: false }
  },

  serialize: function(recordSnapshot/*, options*/) {
    var json = this._super.apply(this, arguments);
    var password = get(recordSnapshot.record, 'password');
    var passwordConfirmation = get(recordSnapshot.record, 'passwordConfirmation');
    var currentPassword = get(recordSnapshot.record, 'currentPassword');

    json.password = password;
    json.password_confirmation = passwordConfirmation;
    json.current_password = currentPassword;

    return json;
  }
});
