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
  isDelayed: Ember.computed.equal('gameStatus.status', 'Delayed'),
  isDelayedStart: Ember.computed.equal('gameStatus.status', 'Delayed Start'),
  isCurrentlyDelayed: Ember.computed.or('isDelayed', 'isDelayedStart'),
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
  review: DS.attr(),
  awayManagerChallenges: Ember.computed('review', function() {
    let awayChallengeRemaining = parseFloat(this.get('review.challenges_away_remaining'));

    return awayChallengeRemaining;
  }),
  hasAwayChallengeRemaining: Ember.computed.gt('awayManagerChallenges', 0),
  homeManagerChallenges: Ember.computed('review', function() {
    let homeChallengesRemaining = parseFloat(this.get('review.challenges_home_remaining'));

    return homeChallengesRemaining;
  }),
  hasHomeChallengesRemaining: Ember.computed.gt('homeManagerChallenges', 0),
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
  runnersOnBase: DS.attr(),
  isOnFirstBase: Ember.computed('runnersOnBase', function() {
    return this.get('runnersOnBase.runner_on_1b');
  }),
  isOnSecondBase: Ember.computed('runnersOnBase', function() {
    return this.get('runnersOnBase.runner_on_2b');
  }),
  isOnThirdBase: Ember.computed('runnersOnBase', function() {
    return this.get('runnersOnBase.runner_on_3b');
  }),
  isStrikeOne: DS.attr('boolean'),
  isStrikeTwo: DS.attr('boolean'),
  isStrikeThree: DS.attr('boolean'),
  setStrikeCount: Ember.computed('gameStatus', function() {
    let strikeCount = this.get('gameStatus.s');

    this.set('isStrikeOne', false);
    this.set('isStrikeTwo', false);
    this.set('isStrikeThree', false);

    if (strikeCount === '1') {
      this.set('isStrikeOne', true);
    } else if (strikeCount === '2') {
      this.set('isStrikeOne', true);
      this.set('isStrikeTwo', true);
    } else if (strikeCount === '3') {
      this.set('isStrikeOne', true);
      this.set('isStrikeTwo', true);
      this.set('isStrikeThree', true);
    } else {
      this.set('isStrikeOne', false);
      this.set('isStrikeTwo', false);
      this.set('isStrikeThree', false);
    }
  }),
  hasStrikeCountChanged: Ember.observer('gameStatus', function() {
    let gameStatus = this.get('gameStatus.status');

    if (gameStatus === 'In Progress') {
      this.get('setStrikeCount');
    }
  }),
  isBallOne: DS.attr('boolean'),
  isBallTwo: DS.attr('boolean'),
  isBallThree: DS.attr('boolean'),
  isBallFour: DS.attr('boolean'),
  setBallCount: Ember.computed('gameStatus', function() {
    let ballCount = this.get('gameStatus.b');

    this.set('isBallOne', false);
    this.set('isBallTwo', false);
    this.set('isStrikeThree', false);

    if (ballCount === '1') {
      this.set('isBallOne', true);
    } else if (ballCount === '2') {
      this.set('isBallOne', true);
      this.set('isBallTwo', true);
    } else if (ballCount === '3') {
      this.set('isBallOne', true);
      this.set('isBallTwo', true);
      this.set('isBallThree', true);
    } else if (ballCount === '4') {
      this.set('isBallOne', true);
      this.set('isBallTwo', true);
      this.set('isBallThree', true);
    } else {
      this.set('isBallOne', false);
      this.set('isBallTwo', false);
      this.set('isBallThree', false);
      this.set('isBallFour', false);
    }
  }),
  hasBallCountChanged: Ember.observer('gameStatus', function() {
    let gameStatus = this.get('gameStatus.status');

    if (gameStatus === 'In Progress') {
      this.get('setBallCount');
    }
  }),
  isOutOne: DS.attr('boolean'),
  isOutTwo: DS.attr('boolean'),
  isOutThree: DS.attr('boolean'),
  setOutCount: Ember.computed('gameStatus', function() {
    let outCount = this.get('gameStatus.o');

    this.set('isOutOne', false);
    this.set('isOutTwo', false);
    this.set('isOutThree', false);

    if (outCount === '1') {
      this.set('isOutOne', true);
    } else if (outCount === '2') {
      this.set('isOutOne', true);
      this.set('isOutTwo', true);
    } else if (outCount === '3') {
      this.set('isOutOne', true);
      this.set('isOutTwo', true);
      this.set('isOutThree', true);
    } else {
      this.set('isOutOne', false);
      this.set('isOutTwo', false);
      this.set('isOutThree', false);
    }
  }),
  hasOutCountChanged: Ember.observer('gameStatus', function() {
    let gameStatus = this.get('gameStatus.status');

    if (gameStatus === 'In Progress') {
      this.get('setOutCount');
    }
  }),
  playByPlay: DS.attr(),
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
