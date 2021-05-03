const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

//env
const port = process.env.PORT || 3000;

//connect to db
mongoose
  .connect("mongodb://mongodb:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to db");
  });
const app = express();

// for nginx proxy
app.set("trust proxy", 1);

//redis
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

//middlewares
app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret$%^134",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: true, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 60 * 24 * 365, // session max age in miliseconds
    },
  })
);
//routes
app.get("/", (req, res) => {
  req.session.user = "test cookie";
  console.log("wap");
  res.send("<h1>wap</h1>");
});

app.listen(port, () => {
  console.log(`app listening on port: ${3000}`);
});
