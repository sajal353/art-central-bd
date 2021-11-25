require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const { query } = require("express");

const port = process.env.PORT;
const user = process.env.USER;
const pass = process.env.PASSWORD;

const uri = `mongodb+srv://${user}:${pass}@programming-hero.cfxg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("client", client);

const usersRouter = require("./routes/users/index");
const artworksRouter = require("./routes/artworks/index");
const ordersRouter = require("./routes/orders/index");
const reviewsRouter = require("./routes/reviews/index");

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/users", usersRouter);
app.use("/artworks", artworksRouter);
app.use("/orders", ordersRouter);
app.use("/reviews", reviewsRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
