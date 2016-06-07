import Ember from 'ember';
import DS from 'ember-data';
import Model from 'ember-data/model';
import { ordinalSuffix } from '../helpers/ordinal-suffix';
import { localizeTime } from '../helpers/localize-time';

export default Model.extend({
  time: DS.attr('string'),
  ampm: DS.attr('string'),
  timeZone: DS.attr('string'),
  gameDate: DS.attr('string'),
  gameTime: Ember.computed('gameDate', 'time', 'ampm', 'timeZone', function() {
    let date = this.get('gameDate'),
      time = this.get('time'),
      ampm = this.get('ampm'),
      gameTimeZone = this.get('timeZone');

    return localizeTime(date, time, ampm, gameTimeZone);
  }),
  venue: DS.attr('string'),
  location: DS.attr('string'),
  gameStatus: DS.attr(),
  isPreGame: Ember.computed.equal('gameStatus.status', 'Pre-Game'),
  isPreview: Ember.computed.equal('gameStatus.status', 'Preview'),
  isWarmup: Ember.computed.equal('gameStatus.status', 'Warmup'),
  isInProgress: Ember.computed.equal('gameStatus.status', 'In Progress'),
  isFinal: Ember.computed.equal('gameStatus.status', 'Final'),
  isGameOver: Ember.computed.equal('gameStatus.status', 'Game Over'),
  isGameCompleted: Ember.computed.or('isFinal', 'isGameOver'),
  isExtraInnings: Ember.computed.gt('finalInning', 9),
  finalInning: Ember.computed('gameStatus', function() {
    return parseFloat(this.get('gameStatus.inning'));
  }),
  currentInning: Ember.computed('gameStatus', function() {
    let currentInning = ordinalSuffix(this.get('gameStatus.inning')),
      inningState = this.get('gameStatus.inning_state');

      return `${inningState} ${currentInning}`;
  }),
  awayTeamName: DS.attr('string'),
  awayTeamAbbrev: DS.attr('string'),
  awayTeamLogo: Ember.computed('awayTeamAbbrev', function() {
    let awayTeamAbbrev = this.get('awayTeamAbbrev');

    return `assets/images/team-logos/${awayTeamAbbrev.toLowerCase()}.png`;
  }),
  awayTeamWins: DS.attr('number'),
  awayTeamLosses: DS.attr('number'),
  awayProbablePitcher: DS.attr(),
  awayProbablePitcherURL: Ember.computed('awayProbablePitcher', 'awayTeamName', function() {
    let pitcherId = this.get('awayProbablePitcher.id'),
      pitcherFirstName = this.get('awayProbablePitcher.first').toLowerCase(),
      pitcherLastName = this.get('awayProbablePitcher.last').toLowerCase(),
      teamName = this.get('awayTeamName').toLowerCase();

    teamName = teamName.replace('-', '');
    teamName = teamName.replace(' ', '');

    return `http://m.${teamName}.mlb.com/player/${pitcherId}/${pitcherFirstName}-${pitcherLastName}`;
  }),
  homeTeamName: DS.attr('string'),
  homeTeamAbbrev: DS.attr('string'),
  homeTeamLogo: Ember.computed('homeTeamAbbrev', function() {
    let homeTeamAbbrev = this.get('homeTeamAbbrev');

    return `assets/images/team-logos/${homeTeamAbbrev.toLowerCase()}.png`;
  }),
  homeTeamWins: DS.attr('number'),
  homeTeamLosses: DS.attr('number'),
  homeProbablePitcher: DS.attr(),
  homeProbablePitcherURL: Ember.computed('homeProbablePitcher', 'homeTeamName', function() {
    let pitcherId = this.get('homeProbablePitcher.id'),
      pitcherFirstName = this.get('homeProbablePitcher.first').toLowerCase(),
      pitcherLastName = this.get('homeProbablePitcher.last').toLowerCase(),
      teamName = this.get('homeTeamName').toLowerCase();

    teamName = teamName.replace('-', '');
    teamName = teamName.replace(' ', '');

    return `http://m.${teamName}.mlb.com/player/${pitcherId}/${pitcherFirstName}-${pitcherLastName}`;
  }),
  linescore: DS.attr(),
  awayTeamRuns: Ember.computed('linescore', function() {
    return this.get('linescore.r.away');
  }),
  awayTeamHits: Ember.computed('linescore', function() {
    return this.get('linescore.h.away');
  }),
  awayTeamErrors: Ember.computed('linescore', function() {
    return this.get('linescore.e.away');
  }),
  homeTeamRuns: Ember.computed('linescore', function() {
    return this.get('linescore.r.home');
  }),
  homeTeamHits: Ember.computed('linescore', function() {
    return this.get('linescore.h.home');
  }),
  homeTeamErrors: Ember.computed('linescore', function() {
    return this.get('linescore.e.home');
  }),
  winningPitcher: DS.attr(),
  winningPitcherWins: Ember.computed('winningPitcher', function() {
    return this.get('winningPitcher.wins');
  }),
  winningPitcherLosses: Ember.computed('winningPitcher', function() {
    return this.get('winningPitcher.losses');
  }),
  winningPitcherERA: Ember.computed('winningPitcher', function() {
    return this.get('winningPitcher.era');
  }),
  losingPitcher: DS.attr(),
  losingPitcherWins: Ember.computed('losingPitcher', function() {
    return this.get('losingPitcher.wins');
  }),
  losingPitcherLosses: Ember.computed('losingPitcher', function() {
    return this.get('losingPitcher.losses');
  }),
  losingPitcherERA: Ember.computed('losingPitcher', function() {
    return this.get('losingPitcher.era');
  }),
  savePitcher: DS.attr(),
  hasSavePitcher: Ember.computed.notEmpty('savePitcher.id'),
  savePitcherSaves: Ember.computed('savePitcher', function() {
    return this.get('savePitcher.saves');
  })
});
