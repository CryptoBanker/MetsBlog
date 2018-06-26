const express = require("express");
const app = express();
const Axios = require("axios");

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "public")));

const { db, Day } = require("./db");

app.get("/api/day/:month/:date/:year", async (req, res, next) => {
  try {
    const response = await Axios(
      "http://statsapi.mlb.com/api/v1/schedule?sportId=1&date=06/14/2018"
    );
    const day = response.data;
    res.send(day.dates[0].games[0]);
  } catch (err) {
    console.log(err.message);
  }
});

(async () => {
  await db.sync({ force: true });
  app.listen(3000, () => console.log("listening on port 3000"));
})();
