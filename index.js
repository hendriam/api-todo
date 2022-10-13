const express = require("express"),
    app = express(),
    port = process.env.PORT || 4000,
    cors = require("cors"),
    bodyParser = require("body-parser");

const mongoose = require("mongoose");
const dbConfig = require("./configs/database.js");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`[MongoDB] Successfully connected to the database`);
    })
    .catch((err) => {
        console.log(
            `[MongoDB] Could not connect to the database. Exiting now...`
        );
        process.exit();
    });

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

var routes = require("./routes/route");
routes(app);

app.listen(port);
console.log(`[PERSON APP] READY => PORT ${JSON.stringify(port)}`);
