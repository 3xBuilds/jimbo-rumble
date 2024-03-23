import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected!');
    return;
  }

  try {

    const mongoURI = process.env.MONGO_URI;

    if (mongoURI) {
      await mongoose.connect(mongoURI)

      isConnected = true;
      console.log('MongoDB connected!');
    }
  }
  catch (error) {
    console.log(error);
    
  }
}