import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(config?.databaseUrl as string);
    app.listen(config?.port, () => {
      console.log(`server is running at port ${config?.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
