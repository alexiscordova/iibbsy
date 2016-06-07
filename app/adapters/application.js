import Ember from 'ember';
import DS from 'ember-data';

let date = new Date(),
  month = ('0' + (date.getMonth() + 1)).slice(-2),
  day = ('0' + date.getDate()).slice(-2),
  year = date.getFullYear();

export default DS.RESTAdapter.extend({
  host: 'http://mlb.mlb.com/gdcross/components/game/mlb',
  namespace: `year_${year}/month_${month}/day_${day}`,
  suffix: '.json',
  pathForType: function() {
    return Ember.String.underscore('master_scoreboard') + this.get('suffix');
  }
});
