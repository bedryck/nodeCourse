const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const homeRoutes = require("./routes/home.js");
const addRoutes = require("./routes/add.js");
const coursesRoutes = require("./routes/courses.js");
const cardRoutes = require("./routes/card.js");
const orderRoutes = require("./routes/orders.js");
const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile.js");
const mongoose = require("mongoose");
const csrf = require("csurf");
const flash = require("connect-flash");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const errorMiddleware = require("./middleware/error");
const keys = require("./keys");

const store = new MongoStore({
  collection: "sessions",
  url: keys.URL_DB,
  stringify: false,
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(csrf());
app.use(flash());

app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const conn = mongoose.connection;
    conn
      .once("open", () => {
        console.log("connected to MongoDB!");
      })
      .on("error", (err) => console.error("connecting to MongoDB " + err));

    await mongoose.connect(keys.URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => {
      console.log("server started:", PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
