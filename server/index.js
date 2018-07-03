const express = require('express');
const app = express();
const Axios = require('axios');
const bodyParser = require('body-parser');
const Api = require('../api');

const apiString = 'http://statsapi.mlb.com/api/v1/schedule?sportId=1&date=';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'public')));

const { db, Day } = require('./db');
/**
 * Returns today's games in a slightly more workable format
 */
app.get('/api/today/games', async (req, res, next) => {
  try {
    let response = await getGames();
    response = response.dates[0].games;
    res.json(response);
  } catch (err) {
    next(err);
  }
});

/**
 * Returns today's teams (no change)
 */
app.get('/api/today/teams', async (req, res, next) => {
  try {
    let response = await getTeams();
    response.teams.forEach(team => {
      console.log(team.id, team.name);
    });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

/**
 * TODO: Will eventually return today's Mets data
 */
app.get('/api/today/mets', async (req, res, next) => {
  try {
    let response = await getGames();
    response = response.dates[0].games;
    let toSend;
    response.forEach(game => {
      if (game.teams.home.team.id === 121 || game.teams.away.team.id === 121) {
        toSend = game;
      }
    });
    res.json(toSend);
  } catch (err) {
    next(err);
  }
});

/**
 * Modifications to data returned from erwstout's API
 */
async function getGames(date) {
  let dateQuery = '';
  if (date) {
    dateQuery = date;
  } else {
    dateQuery = dateString(new Date());
  }

  const data = await Api.getGames(dateQuery);
  return data;
}

/**
 * Modifications to data returned from erwstout's API
 */
async function getTeams(teamId) {
  let teamQuery = '';
  if (teamId) {
    teamQuery = teamId;
  }

  const data = await Api.getTeams(teamQuery);
  return data;
}

/**
 * Depracated and antiquated
 * REMOVE?
 */
async function apiFetch(apiUrl) {
  try {
    const response = await Axios(apiUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Takes today's date and returns in 'mm/dd/yyyy' format
 */
function dateString() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let dateString = month + '/' + day + '/' + year;
  return dateString;
}

/**
 * Start the server
 * TODO: to move to another file
 */
(async () => {
  await db.sync({ force: true });
  app.listen(3000, () =>
    console.log(`Listening at:

  http://localhost:3000`)
  );
})();
