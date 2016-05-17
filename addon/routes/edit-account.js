import AuthenticatedRoute from 'ember-authenticate-me/routes/authenticated';

export default AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('user', params.user_id);
  }
});
