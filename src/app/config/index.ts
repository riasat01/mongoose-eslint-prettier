import dotenv from 'dotenv';
import path from 'path';

// console.log(process.cwd());
dotenv.config({ path: path.join(process.cwd() + '/.env') });

export default {
  NODE_ENV: process?.env?.NODE_ENV,
  port: process?.env?.PORT,
  databaseUrl: process?.env?.DB_URL,
  bcrypt_salt_rounds: process?.env?.BCRYPT_SALT_ROUNDS,
  default_password: process?.env?.DEFAULT_PASSWORD,
};
