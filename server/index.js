const express = require('express');
const app = express();
const Axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'public')));

const { db, Day } = require('./db');

app.get('/api/day/:month/:date/:year', async (req, res, next) => {
  try {
    //console.log(req);
    const response = await Axios(
      'http://statsapi.mlb.com/api/v1/schedule?sportId=1&date=06/25/2018'
    );
    const day = response.data;
    day.dates[0].games.forEach(game => {
      console.log(game.teams.away.team.name);
      console.log(game.teams.home.team.name);
    });
    // console.log(day.dates[0].games.keys());
    // console.log(day.dates[0].games);
    res.json(day.dates[0].games);
  } catch (err) {
    console.log('***** encountered error: ', err);
  }
});

(async () => {
  await db.sync({ force: true });
  app.listen(3000, () =>
    console.log(`Listening at:

  http://localhost:3000`)
  );
})();
