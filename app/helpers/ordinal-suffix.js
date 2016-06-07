import Ember from 'ember';

export function ordinalSuffix(number) {
  var numArray = ('' + number).split('').reverse();

  if (numArray[1] !== '1') {
    switch(numArray[0]) {
      case '1':
        return `${number}st`;
      case '2':
        return `${number}nd`;
      case '3':
        return `${number}rd`;
    }
  }

  return `${number}th`;
}

export default Ember.Helper.helper(ordinalSuffix);
