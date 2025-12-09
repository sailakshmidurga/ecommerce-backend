import dotenv from "dotenv";
dotenv.config();  // MUST be first

import app from "./app.js";
import sequelize from "./config/db.js";

console.log("Loaded password:", `"${process.env.DB_PASSWORD}"`);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });

  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
