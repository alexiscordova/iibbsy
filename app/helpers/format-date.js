import Ember from 'ember';
import moment from 'moment';

export function formatDate(params, { format = 'MMMM Do, YYYY' }) {
  let currentDate = params[0];

  return moment(currentDate).format(format);
}

export default Ember.Helper.helper(formatDate);
