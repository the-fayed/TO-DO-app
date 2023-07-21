const mongoose = require(`mongoose`);

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then((result) => {
      console.log(`Database Connected!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = dbConnection;
