import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['wrapup'],
  attributeBindings: ['data-component'],
  'data-component': 'wrapup'
});
