// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express"),
  mongodb = require("mongodb"),
  bodyParser = require("body-parser"),
  app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static("public"));
app.use(express.json());

let username = null;



const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://jenna_galli:${process.env.DBPASS}@generatorapp.l0gsu.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let collection = null;

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("finalProjectDatabase").collection("UserData");
  })
  .then(__collection => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find().toArray();
  })
  .then(arr => {
    //console.log(arr);
  
  });



// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.post(
  "/add",
  bodyParser.json(),
  function(req, res, next) {
    if (username != null) {
      
      next();
    }
  },
  function(req, res, next) {
    if (username != null) {
      // assumes only one object to insert
      
      collection.insertOne(1).then(result => {
        //console.log(result.ops[0])
        res.json(result.ops[0]);
      });
    }
  }
);

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post("/remove", bodyParser.json(), function(req, res) {
  if (username != null) {
    
    collection
      .deleteOne({ id: req.body.id })
      .then(result => res.json(result));
  }
});

app.post("/update", bodyParser.json(), (req, res) => {
  if (username != null) {
   

    collection
      .updateOne(
        { id: req.body.id },
        { $set: { 1:1 } }
      )
      .then(result => {
        console.log(result);
        //res.json(result);
      });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
