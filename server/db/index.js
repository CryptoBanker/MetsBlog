const Sequelize = require('sequelize');
const db = new Sequelize(
  'postgres://postgres:rickisgreat@localhost:5432/metsblog',
  {
    logging: false,
  }
);

const Day = db.define('day', {
  totalGames: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gamesList: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
});

module.exports = { db, Day };
