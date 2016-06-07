import DS from 'ember-data';

function deleteUnusedProperties(data) {
  data.forEach(function(item) {
    delete item.aw_lg_ampm;
    delete item.away_ampm;
    delete item.away_code;
    delete item.away_file_code;
    delete item.away_league_id;
    if (item.awayProbablePitcher) {
      delete item.away_probable_pitcher.first_name;
      delete item.away_probable_pitcher.last_name;
      delete item.away_probable_pitcher.name_display_roster;
      delete item.away_probable_pitcher.s_era;
      delete item.away_probable_pitcher.s_wins;
      delete item.away_probable_pitcher.s_losses;
    }
    delete item.away_sport_code;
    delete item.away_team_city;
    delete item.away_team_id;
    delete item.away_time;
    delete item.away_time_zone;
    delete item.broadcast;
    delete item.day;
    delete item.first_pitch_et;
    delete item.game_data_directory;
    delete item.game_nbr;
    delete item.game_media;
    delete item.game_pk;
    delete item.gameday;
    delete item.gameday_sw;
    delete item.hm_lg_ampm;
    delete item.home_ampm;
    delete item.home_code;
    delete item.home_file_code;
    delete item.home_league_id;
    if (item.home_probable_pitcher) {
      delete item.home_probable_pitcher.first_name;
      delete item.home_probable_pitcher.last_name;
      delete item.home_probable_pitcher.name_display_roster;
      delete item.home_probable_pitcher.s_era;
      delete item.home_probable_pitcher.s_wins;
      delete item.home_probable_pitcher.s_losses;
    }
    delete item.home_sport_code;
    delete item.home_team_city;
    delete item.home_team_id;
    delete item.links;
    delete item.scheduled_innings;
    delete item.tbd_flag;
    delete item.tiebreaker_sw;
    delete item.time_aw_lg;
    delete item.time_date;
    delete item.time_date_aw_lg;
    delete item.time_date_hm_lg;
    delete item.time_hm_lg;
    delete item.time_zone;
    delete item.time_zone_aw_lg;
    delete item.time_zone_hm_lg;
    delete item.tz_aw_lg_gen;
    delete item.tz_hm_lg_gen;
    delete item.venue_id;
    delete item.venue_w_chan_loc;
    delete item.video_thumbnail;
    delete item.video_thumbnails;
  });

  return data;
}

export default DS.RESTSerializer.extend({
  attrs: {
    time: 'home_time',
    timeZone: 'home_time_zone',
    gameDate: 'original_date',
    gameStatus: 'status',
    awayTeamName: 'away_team_name',
    awayTeamAbbrev: 'away_name_abbrev',
    awayTeamWins: 'away_win',
    awayTeamLosses: 'away_loss',
    awayProbablePitcher: 'away_probable_pitcher',
    homeTeamName: 'home_team_name',
    homeTeamAbbrev: 'home_name_abbrev',
    homeTeamWins: 'home_win',
    homeTeamLosses: 'home_loss',
    homeProbablePitcher: 'home_probable_pitcher',
    winningPitcher: 'winning_pitcher',
    losingPitcher: 'losing_pitcher',
    savePitcher: 'save_pitcher'
  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let games = deleteUnusedProperties(payload.data.games.game);

    payload = {
      game: games
    };

    console.log(payload);

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
