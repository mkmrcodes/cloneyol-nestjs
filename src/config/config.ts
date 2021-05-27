export const config = () => ({
  port: Number(process.env.PORT),
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    //subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
    synchronize: process.env.DB_SYNC,
  },
});
