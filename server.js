var express = require("express");
var db = require('./models');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/api-routes.js")(app);
db.sequelize.sync();

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
