import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['isGameCompleted', 'isInProgress:desc', 'isDelayedStart:desc', 'isBeingChallenged', 'gameTime'],
  sortedGames: Ember.computed.sort('model', 'sortProperties')
});
