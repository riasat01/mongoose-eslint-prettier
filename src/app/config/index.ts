import dotenv from 'dotenv';
import path from 'path';

console.log(process.cwd());
dotenv.config({ path: path.join(process.cwd() + '/.env') });

export default {
  port: process?.env?.PORT,
  databaseUrl: process?.env?.DB_URL,
};
