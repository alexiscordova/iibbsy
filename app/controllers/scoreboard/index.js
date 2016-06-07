import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['isGameCompleted'],
  sortedGames: Ember.computed.sort('model', 'sortProperties')
});
