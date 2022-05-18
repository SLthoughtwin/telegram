require('dotenv').config()
module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.PG_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST_NAME,
    dialect: process.env.USER_NAME
  },
  test: {
    username: process.env.USER_NAME,
    password: process.env.PG_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST_NAME,
    dialect: process.env.USER_NAME
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.PG_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST_NAME,
    dialect: process.env.USER_NAME
  }
};
