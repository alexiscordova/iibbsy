import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('game');
  },

  _reloadScoreData() {
    const interval = 5000;

    Ember.run.later(() => {
      this.store.findAll('game');
      this._reloadScoreData();
    }, interval);
  },

  afterModel() {
    this._reloadScoreData();
  }
});
