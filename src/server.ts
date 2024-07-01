import express from "express";
import { getPayloadClient } from "./payload";
import { nextApp, nextHandler } from "./utils/next";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cb) => {
        cb.logger.info(`Admin URL ${cb.getAdminURL()}`);
      },
    },
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Nextjs started!");
  });

  app.listen(PORT, () => {
    payload.logger.info(`Nextjs App URL ${process.env.NEXT_PUBLIC_SERVER_URL}`);
  });
};

startServer();
