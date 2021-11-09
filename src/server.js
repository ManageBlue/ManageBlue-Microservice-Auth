const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const server = express();
// TODO: env ali config
const port = process.env.PORT || 5000;
const url = process.env.URL || "http://localhost";
//----------------------------------------------------------------------------------------------------------------------


// cors settings
let corsOptions = {
    //origin: url + ":" + 8080
    origin: '*'
};
server.use(cors(corsOptions));

// parse requests of content-type - application/json
server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
//----------------------------------------------------------------------------------------------------------------------


require("./models/db");
require("./routes/authentication")(server);
require("./routes/users")(server);
require("./config/passport.js");

server.use(passport.initialize());

server.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});


/**
 * Start server
 */
server.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

module.exports = server;
