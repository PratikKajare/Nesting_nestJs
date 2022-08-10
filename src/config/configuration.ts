export const config = () => ({
  port: Number(process.env.PORT),
  database: {
    host: process.env.DATABASE_HOST,
    port: 3000,
  },
});
