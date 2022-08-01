import dotenv from "dotenv";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { Express } from "express";
import { graphqlUploadExpress } from "graphql-upload";
import schema from "./schema";

dotenv.config();

const startServer = async () => {
  const server: ApolloServer = new ApolloServer({
    schema,
    context: async (expressContext) => {
      const { req } = expressContext;
    },
  });

  await server.start();

  const app: Express = express();

  const corsOptions = {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true, // <-- REQUIRED backend setting
  };

  // compression : express 환경에서 Gzip 압축을 통해 response 데이터 사이즈를 크게 줄여 성능을 향상시켜주는 미들웨어
  app.use(compression());

  app.use(cors(corsOptions));

  app.use(morgan("dev"));

  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  const httpServer = createServer(app);

  const PORT: number = 4000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}✅`);
    console.log(`🚀 Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`);
  });
};

startServer();
