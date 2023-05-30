import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mysql: {
      dbHost: process.env.MYSQL_HOST,
      dbName: process.env.MYSQL_DB_NAME,
      dbPort: parseInt(process.env.MYSQL_PORT),
      dbUser: process.env.MYSQL_USER,
      dbPass: process.env.MYSQL_PASS,
    },
    mysqlUrl: process.env.MYSQL_DATABASE_URL,
    postgres: {
      dbHost: process.env.POSTGRES_HOST,
      dbName: process.env.POSTGRES_DB_NAME,
      dbPort: parseInt(process.env.POSTGRES_PORT),
      dbUser: process.env.POSTGRES_USER,
      dbPass: process.env.POSTGRES_PASS,
    },
    postgresUrl: process.env.POSTGRES_DATABASE_URL,
    allowCors: process.env.ALLOW_CORS,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
