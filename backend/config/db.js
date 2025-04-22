
import mongoose from "mongoose";

const retry = async (fn, retries = 3) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      if (err.name === 'MongoTimeoutError') {
        attempt++;
        console.log(`Retry attempt ${attempt}...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second
      } else {
        throw err;
      }
    }
  }
  throw new Error('Maximum retries exceeded');
};

export const connectDB = async () =>{
  await retry(async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        timeoutMS: 30000 // 30 seconds
      });
      console.log("DB connected");
    } catch (error) {
      console.error("Error connecting to DB:", error);
      throw error;
    }
  });
}


