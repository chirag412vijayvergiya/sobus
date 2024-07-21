const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.log(err);
  // console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");
//console.log(process.env);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// const testTour = new Tour({
//   name: 'The romble Hiker',
//   rating: 4.9,
//   price: 497,
// });

// testTour
//   .save({ wtimeout: 20000 })
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log('ERROR 💥', err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
