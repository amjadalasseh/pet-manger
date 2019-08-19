require("dotenv").config();
import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";
import { Client } from "pg";
import schema from "../graphql/";
import { models } from "./db/";

const { mongoURI: db } = process.env;

const client = new Client({
  password: "admin",
  user: "admin",
  host: "jdbc:postgresql://localhost:5432/potgres",
});

const pubsub = new PubSub();

const options = {
  port: process.env.PORT || "4001",
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};

const context = {
  models,
  pubsub
};

(async () => {
  await client.connect();
  console.log("wdwd connected")
})();


// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = new GraphQLServer({
  schema,
  context
});

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
