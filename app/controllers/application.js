import Ember from 'ember';

let currentDate = new Date(),
  currentYear = currentDate.getFullYear();

export default Ember.Controller.extend({
  appName: "Is It Baseball Season Yet",
  currentYear: currentYear,
  currentDate: currentDate
});
