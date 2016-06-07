import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['play-by-play'],
  attributeBindings: ['data-component'],
  'data-component': 'play-by-play'
});
