const express = require('express');
const app = express();
const Axios = require('axios');
const bodyParser = require('body-parser');

const apiString = 'http://statsapi.mlb.com/api/v1/schedule?sportId=1&date=';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'public')));

const { db, Day } = require('./db');

app.get('/api/today', async (req, res, next) => {
  let dayString = dateString();
  let queryString = apiString + dayString;
  const day = await apiFetch(queryString);
  console.log(day);
  res.json(day.dates[0].games);
});

app.get('/api/day/:month/:day/:year', async (req, res, next) => {
  let month = req.params.month;
  let day = req.params.day;
  let year = req.params.year;
  let dayString = month + '/' + day + '/' + year + '/';
  let apiString;
  res.json(dayString);
});

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
