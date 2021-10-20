const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const db = require("./config/mongoose");

// used for session cookie
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy"); 
const MongoStore = require('connect-mongo');


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);  



// set view engine and view route
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(session({
  name: "codial",
  // TODO - change secret in production
  secret: "blahsomething",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000* 60 *100)
  },
  store: MongoStore.create(
  {
      client: db.getClient(),
      autoRemove: 'disabled',
  },
  function(err){
    console.log(err || "connect-mongodb setup ok");
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router to connect
app.use("/", require("./routes"));


app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server: ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
