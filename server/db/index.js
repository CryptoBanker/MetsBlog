const Sequelize = require("sequelize");
const db = new Sequelize(
  "postgres://postgres:rickisgreat@localhost:5432/metsblog"
);

const Day = db.define("day", {
  totalGames: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  gamesList: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
});

// const Team = db.define("team", {
//   name: Sequelize.STRING,
//   flagURL: Sequelize.TEXT
// });

module.exports = { db, Day };
