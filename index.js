const express = require("express");
const app = express();
const port = 8000;

// use express router to connect
app.use("/", require("./routes"));

// set view engine and view route
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server: ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
