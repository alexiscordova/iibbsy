import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['due-up'],
  attributeBindings: ['data-component'],
  'data-component': 'due-up'
});
