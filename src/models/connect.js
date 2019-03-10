import Sequelize from 'sequelize';

const sequelize = new Sequelize('sqlite:database.sqlite', { 'logging': false });

// define Models
const Unit = sequelize.define('unit', {
  'passcode': {
    'type': Sequelize.STRING,
  },
  'no': {
    'type': Sequelize.STRING,
    'primaryKey': true,
  },
  'status': {
    'type': Sequelize.ENUM('available', 'reserved'),
  },
  'firstPricePerHour': {
    'type': Sequelize.INTEGER,
  },
  'laterPricePerHour': {
    'type': Sequelize.INTEGER,
  },
});
const Locker = sequelize.define('locker', {
  'no': {
    'type': Sequelize.STRING,
    'primaryKey': true,
  },
});
Locker.hasMany(Unit);

sequelize.sync().then(() => {
  console.log('sync ok.');
}).catch((err) => {
  console.log(`sync fail : ${err}`);
});

export {
  sequelize,
  Unit,
  Locker,
};
