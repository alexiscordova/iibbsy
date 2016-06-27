# Is It Baseball Season Yet [![Build Status](https://travis-ci.org/alexiscordova/iibbsy.svg?branch=master)](https://travis-ci.org/alexiscordova/iibbsy)

Why yes, yes it is baseball season.

[Is It Baseball Season Yet](http://isitbaseballseasonyet.com) (IIBBSY) is a side project by [Alexis Córdova](http://alexiscordova.com). This project comes in two flavors, depending on the time of year:

* During the regular and post-season, IIBBSY is an interactive daily scoreboard, powered by Ember.js and the MLB Gameday API (the same API that powers the MLB At Bat app and MLB Gameday), which allows users to get information about the day's games in a quick and efficient manner. More in-depth information and stats are also available. All of this is in the repository you're viewing now.
* During the offseason, IIBBSY is a countdown timer to the first game of the upcoming MLB season. The code for that project can be found in the [IIBBSY-Countdown](https://github.com/alexiscordova/iibbsy-countdown) repository.

The offseason version of IIBBSY may eventually be merged into this project.

While this is technically version 4 of Is It Baseball Season Yet, it is version 1 of the Ember.js app. The feature set will mature accordingly.

## Prerequisites

You will need the following things properly installed on your computer:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone git@github.com:alexiscordova/iibbsy.git` this repository
* Change into the new directory
* `npm install`
* `bower install`

## Local Development

* `ember server`
* Visit IIBBSY at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (Development)
* `ember build --environment production` (Production)

### Deploying

TBD

### License

While this project is covered by the [MIT License](https://mit-license.org), all team names, logos, and game data is copyright [MLB Advanced Media, L.P.](http://gdx.mlb.com/components/copyright.txt) (MLBAM), unless otherwise stated. Please don't sue me.

### Author

Alexis Córdova  
[http://alexiscordova.com](http://alexiscordova.com)
