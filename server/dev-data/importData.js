const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./../models/userModel');
const Activity = require('./../models/activityModel');

dotenv.config({ path: '../config.env' });

// Use the database URL from the environment variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option for the latest Mongoose version
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const activities = JSON.parse(
//   fs.readFileSync(`${__dirname}/activities.json`, 'utf-8'),
// );

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    // await Activity.create(activities, { validateBeforeSave: false });
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    // await User.deleteMany();
    await Activity.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.error('Error deleting data:', err);
    process.exit(1);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
