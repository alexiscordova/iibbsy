import Ember from 'ember';

export function formatName(params, { firstName, lastName }) {
  let firstInitial;

  if (firstName.length === 0) {
    return 'TBD';
  } else if (firstName.length <= 2) {
    firstInitial = firstName;

    return `${firstInitial} ${lastName}`;
  } else {
    firstInitial = firstName.charAt(0);

    return `${firstInitial}. ${lastName}`;
  }
}

export default Ember.Helper.helper(formatName);
