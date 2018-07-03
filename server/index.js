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

app.get('/api/today/games', async (req, res, next) => {
  try {
    let response = await getGames();
    response = response.dates[0].games;
    res.json(response);
  } catch (err) {
    next(err);
  }
});

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

app.get('/api/today/mets', async (req, res, next) => {});

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

async function getTeams(teamId) {
  let teamQuery = '';
  if (teamId) {
    teamQuery = teamId;
  }

  const data = await Api.getTeams(teamQuery);
  return data;
}

// app.get('/api/today', async (req, res, next) => {
//   let dayString = dateString();
//   let queryString = apiString + dayString;
//   const day = await apiFetch(queryString);
//   day.dates.forEach(date => {
//     date.games.forEach(game => {
//       let awayTeam = game.teams.away.team.name;
//       let homeTeam = game.teams.home.team.name;
//       console.log('*****', awayTeam, ' ', homeTeam);
//     });
//   });
//   res.json(day.dates[0].games);
// });

// app.get('/api/day/:month/:day/:year', async (req, res, next) => {
//   let month = req.params.month;
//   let day = req.params.day;
//   let year = req.params.year;
//   let dayString = month + '/' + day + '/' + year + '/';
//   let apiString;
//   res.json(dayString);
// });

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

function dateString() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let dateString = month + '/' + day + '/' + year;
  return dateString;
}

(async () => {
  await db.sync({ force: true });
  app.listen(3000, () =>
    console.log(`Listening at:

  http://localhost:3000`)
  );
})();
