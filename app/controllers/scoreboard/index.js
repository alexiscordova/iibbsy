import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['isGameCompleted', 'time'],
  sortedGames: Ember.computed.sort('model', 'sortProperties')
});
