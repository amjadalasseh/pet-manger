require("dotenv").config();
import { GraphQLServer, PubSub } from "graphql-yoga";

import schema from "../graphql/";
import  models  from "./mod";

const { mongoURI: db } = process.env;

const pubSub = new PubSub();

const options = {
  port: process.env.PORT || "4001",
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};

const context = {
  models,
  pubSub
};

const server = new GraphQLServer({
  schema,
  context,
});

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
