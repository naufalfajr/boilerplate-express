let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config()

console.log("Hello World");

// app.get("/", (req, res) => {
//     res.send("Hello Express");
// })

absolutePathIndex = __dirname + '/views/index.html';
absolutePathAssets = __dirname + '/public';
resLowerCase = { "message": "Hello json" };
resUpperCase = { "message": "HELLO JSON" };

//Middleware
app.use("/public", express.static(absolutePathAssets));

app.use((req, res, next) => {
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
});

app.use(bodyParser.urlencoded({ extended:false }));

//Route
app.get("/", (req, res) => {
    res.sendFile(absolutePathIndex);
});

app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE == "uppercase"){
        res.json(resUpperCase);
    }else{
        res.json(resLowerCase);
    }
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ "time": req.time });
});

app.get("/:word/echo", (req, res) => {
    res.json({ "echo": req.params.word });
});

app.route("/name").get((req, res) => {
    res.json({ "name": req.query.first+" "+req.query.last})
}).post((req, res) => {
    res.json({ "name": req.body.first+" "+req.body.last})
});



 module.exports = app;
