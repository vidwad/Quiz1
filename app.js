const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const rootRouter = require("./routes/root");
const clucksRouter = require("./routes/clucks");
const app = express(); // http.createServer(...)

app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);


app.use(cookieParser());

console.log("__dirname:", __dirname);

app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
  
  console.log("🍪 Cookies:", request.cookies);
  response.locals.username = "";
  const username = request.cookies.username;

  if (username) {
    response.locals.username = username;
  }

  next();
});



app.use("/", rootRouter);
app.use("/clucks", clucksRouter);

const PORT = 4545;
const ADDRESS = "localhost"; // 127.0.0.1
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});
