import express from "express";
import { getPayloadClient } from "./payload";
import { nextApp, nextHandler } from "./utils/next";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type ExpressContext = Awaited<typeof createContext>;

const startServer = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cb) => {
        cb.logger.info(`Admin URL ${cb.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Nextjs started!");
  });

  app.listen(PORT, () => {
    payload.logger.info(`Nextjs App URL ${process.env.NEXT_PUBLIC_SERVER_URL}`);
  });
};

startServer();
