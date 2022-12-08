const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, { encoding: 'utf8' })
);


mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DATABASE)
  .then((con) => {
    console.log('connection established');
  })
  .catch((err) => console.error(err));

const sendDataToDB = async () => {
  try {
    await Tour.create(tours);
    console.log('data sent to database');
    // process.exit();
  } catch (error) {
   console.log(error) 
  }

};
const deleteDataFromDB = async () => {
  await Tour.deleteMany();
  console.log('data deleted from database');

};

// deleteDataFromDB();
sendDataToDB();
