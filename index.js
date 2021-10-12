const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 8000;


app.use(express.static("./assets"));
app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);  

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
