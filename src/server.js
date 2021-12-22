const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const config = require('./config/config')

const port = config.port
const url = config.url
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
require("./routes/users")(server);


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
