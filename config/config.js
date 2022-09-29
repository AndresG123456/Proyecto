require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName:
    process.env.NODE_ENV !== 'test'
      ? process.env.DB_NAME
      : `${process.env.DB_NAME}_test`,
  dbPort: process.env.DB_PORT,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  secret: process.env.SECRET,
  apiKey: process.env.APIKEY,
};

module.exports = { config };
