import Ember from 'ember';
import moment from 'moment';

const timeZones = {
  'ET': 'US/Eastern',
  'CT': 'US/Central',
  'MT': 'US/Mountain',
  'PT': 'US/Pacific'
};

function convertTimeZone(zone) {
  if (zone.length === 2) {
    if (timeZones[zone] !== 'undefined') {
      return timeZones[zone];
    }
  }

  return zone;
}

export function localizeTime(gameDate, gameTime, ampm, gameTimeZone) {
  let dateArr = gameDate.split('/'),
    timeArr = gameTime.split(':'),
    year = dateArr[0],
    month = dateArr[1],
    day = dateArr[2],
    hour = parseFloat(timeArr[0]),
    minutes = timeArr[1],
    userTimeZone = moment.tz.guess(),
    userTimeZoneAbbrev = moment.tz(userTimeZone).zoneAbbr(),
    date,
    timeZone,
    localizedTime;

    if ((ampm === 'PM') && (hour !== 12)) {
      hour = hour + 12;
    }

    date = `${year}-${month}-${day} ${hour}:${minutes}`;
    timeZone = convertTimeZone(gameTimeZone);
    localizedTime = moment.tz(date, timeZone).tz(userTimeZone).format('h:mm');

    return `${localizedTime} ${ampm} ${userTimeZoneAbbrev}`;
}

export default Ember.Helper.helper(localizeTime);
