// server.js
const express = require("express"),
  mongodb = require("mongodb"),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv").config(),
  app = express();
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());

let scheduleID = null;
let name = null;
let email = null;

//////////////CONNECT TO DB//////////////

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://jenna_galli:${process.env.DB_PASSWORD}@userdata.84jsw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let collection = null;
let collectionMeeting = null;

// mongodb.UserData.remove( { } );

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    // quickly clear the test data
    // client.db("finalProjectDatabase").collection("meetingData").remove({});
    // client.db("finalProjectDatabase").collection("UserData").remove({});
    return client.db("finalProjectDatabase").collection("UserData");
  })
  .then(__collection => {
    console.log("collection" + __collection);
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find().toArray();
  })
  .then(arr => {
    //console.log(arr);
  });

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("finalProjectDatabase").collection("meetingData");
  })
  .then(__collection => {
    // store reference to collection
    collectionMeeting = __collection;
    // blank query returns all documents
    return collectionMeeting.find().toArray();
  })
  .then(arr => {
    //console.log(arr);
  });

///////////DONE CONNECTING TO DB////////////////

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/index.html", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/login.html", (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

app.get("/meetingMaker.html", (request, response) => {
  response.sendFile(__dirname + "/views/meetingMaker.html");
});

app.get("/availability.html", (request, response) => {
  response.sendFile(__dirname + "/views/availability.html");
});

app.get("/scheduling.html", (request, response) => {
  response.sendFile(__dirname + "/views/scheduling.html");
});

let objAdd;
app.post(
  "/add",
  bodyParser.json(),
  function(req, res, next) {
    scheduleID = req.body.scheduleID;
    name = req.body.name;
    email = req.body.email;

    console.log("add call");

    if (scheduleID != null && name != null && email != null) {
      console.log(scheduleID + " " + name + " " + email);
      objAdd = {
        scheduleID: scheduleID,
        name: name,
        email: email,
        weekday: " ",
        availType: " ",
        timeSpan: " ",
        comments: " "
      };
      next();
    }
  },
  function(req, res, next) {
    // assumes only one object to insert
    console.log(objAdd);
    collection.insertOne(objAdd).then(result => {
      res.json(result.ops[0]);
    });
  }
);

let objAddMeet;
app.post(
  "/addMeeting",
  bodyParser.json(),
  function(req, res, next) {
    scheduleID = makeScheduleID(5);
    name = req.body.name;
    email = req.body.email;

    // console.log(scheduleID + ' ' + name + ' ' + email)

    if (name != null && email != null) {
      objAddMeet = {
        scheduleID: scheduleID,
        name: name,
        email: email,
        days: req.body.days,
        start: req.body.start,
        end: req.body.end
      };
      next();
    }
  },
  function(req, res, next) {
    // assumes only one object to insert
    console.log(objAddMeet);
    collectionMeeting.insertOne(objAddMeet).then(result => {
      res.json(result.ops[0]);
    });
  }
);

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post("/remove", bodyParser.json(), function(req, res) {
  if (scheduleID != null && name != null && email != null) {
    collection.deleteOne({ id: req.body.id }).then(result => res.json(result));
  }
});

app.post("/update", bodyParser.json(), (req, res) => {
  if (scheduleID != null && name != null && email != null) {
    collection
      .updateOne({ id: req.body.id }, { $set: { 1: 1 } })
      .then(result => {
        console.log(result);
        //res.json(result);
      });
  }
});

app.post("/getMeeting", function(req, res) {
   collectionMeeting.test.find( { arr:  { $elemMatch: req.body.scheduleID }  } ).toArray().then(result => res.json(result));
  // collectionMeeting.articles
  //   .find({ scheduleID: req.body.scheduleID })
  //   .toArray()
  //   .then(result => res.json(result));
});

app.post("/getSched", function(req, res) {
  collection
    .find({ scheduleID: req.body.scheduleID })
    .toArray()
    .then(result => res.json(result));
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function makeScheduleID(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
