const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const cors = require("cors");

const api = require("./routes");
const db = require("./models");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(8080, ()  => {
  console.log("Listening at port 8080");
});

app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("_method"));
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use("/", api);

app.use(
  session({
    key: "usersId",
    secret: "sessionkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000
    }
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    title: `Error`
  });
});

module.exports = app;
