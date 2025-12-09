import { Worker } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const worker = new Worker(
  "orderQueue",
  async (job) => {
    console.log("Sending email for order:", job.data.orderId);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Email sent for order:", job.data.orderId);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  }
);

worker.on("completed", (job) => {
  console.log("Job completed:", job.id);
});

worker.on("failed", (job, err) => {
  console.log("Job failed:", job.id, err);
});
