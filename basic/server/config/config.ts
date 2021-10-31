import * as dotenv from 'dotenv';
dotenv.config();

type Config = {
  username: string,
  password: string,
  database: string,
  host: string,
  [key: string]: string,
}

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  "development": {
    "username": process.env.DB_USERNAME!,
    "password": process.env.DB_PASSWORD!,
    "database": "database_development",
    "host": process.env.DBHOST!,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME!,
    "password": process.env.DB_PASSWORD!,
    "database": "database_test",
    "host": process.env.DBHOST!,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME!,
    "password": process.env.DB_PASSWORD!,
    "database": "database_production",
    "host": process.env.DBHOST!,
    "dialect": "mysql"
  }
}

export default config