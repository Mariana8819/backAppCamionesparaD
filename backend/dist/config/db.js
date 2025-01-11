import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const isProduction = process.env.WORK_ENVIROPS === 'production';
const url = isProduction ? process.env.URL_DB : process.env.URLDB_DEV;
export async function startConnection() {
  try {
    await mongoose.connect(url);
    // console.log('Successful connection with MongoDB...!');
    console.log('=============================================================');
    console.log(`Successful connection with MongoDB (${isProduction ? 'production (Atlas)' : 'development (local)'})...!`);
    console.log('=============================================================');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}