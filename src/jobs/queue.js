import { Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const orderQueue = new Queue("orderQueue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

export default orderQueue;
