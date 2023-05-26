import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASS,
    },
    allowCors: process.env.ALLOW_CORS,
    apiKey: process.env.API_KEY,
  };
});
