import { config } from 'dotenv'
config();
export default {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  db: {
    development: process.env.STAGING_POSTGRES_DB_URI,
    test: process.env.TEST_POSTGRES_DB_URI,
    production: process.env.POSTGRES_DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRES_IN,
  },
  redis: {
    host: process.env.REDIS_URL,
    staging_host: process.env.STAGING_REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    state: process.env.REDIS_STATE,
  },
};