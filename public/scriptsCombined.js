//////////////////////////MEETING MAKER JS ////////////////////////////////////

const callToMaker = function() {
  ////////code in meetingMaker
  var schedID = "";

  let mon = document.querySelector("input[name=checkbox]"),
    tue = document.querySelector("#weekday-tue"),
    wed = document.querySelector("#weekday-wed"),
    thu = document.querySelector("#weekday-thu"),
    fri = document.querySelector("#weekday-fri"),
    sat = document.querySelector("#weekday-sat"),
    sun = document.querySelector("#weekday-sun");

  let daysOfWeek = [];

  if (document.querySelector("#weekday-sun").checked) {
    daysOfWeek.push("0");
    console.log(daysOfWeek);
  }
  if (document.querySelector("#weekday-mon").checked) {
    daysOfWeek.push("1");
    console.log(daysOfWeek);
  }
  if (document.querySelector("#weekday-tue").checked) {
    daysOfWeek.push("2");
    console.log(daysOfWeek);
  }
  if (document.querySelector("#weekday-wed").checked) {
    daysOfWeek.push("3");
    console.log(daysOfWeek);
  }
  if (document.querySelector("#weekday-thu").checked) {
    daysOfWeek.push("4");
    console.log(daysOfWeek);
  }
  if (document.querySelector("#weekday-fri").checked) {
    daysOfWeek.push("5");
    console.log(daysOfWeek);
  }
  if (document.querySelector("#weekday-sat").checked) {
    daysOfWeek.push("6");
    console.log(daysOfWeek);
  }

  ////times of day

  var startTime = document.getElementById("startTime");
  var start = startTime.value;

  var endTime = document.getElementById("endTime");
  var end = endTime.value;

  function MeetingButton() {
    //console.log("days array " + daysOfWeek);
    var meetingObj = "";

    var x = daysOfWeek;
    var y = document.getElementById("name").value;
    var z = document.getElementById("email").value;

    //make sure text input isn't empty
    if (x.length == 0) {
      alert("Please select days of the week");
      return false;
    }
    if (y == "") {
      alert("Please enter a name before continuing");
      return false;
    }
    if (z == "") {
      alert("Please enter an email before continuing");
      return false;
    }
    if (start == null) {
      alert("Please select a start time");
      return false;
    }
    if (end == null) {
      alert("Please select a end time");
      return false;
    }
    if (end - start <= 0) {
      alert("Please select a valid time period");
      return false;
    }

    //{name: “”, email: “”, days: “”, start:””, end: “”}
    const name = document.querySelector("#name"),
      email = document.querySelector("#email"),
      json = {
        name: name.value,
        email: email.value,
        days: x,
        start: start,
        end: end
      },
      body = JSON.stringify(json);

    fetch("/addMeeting", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        meetingObj = json;
        return meetingObj;
      })
      .then(x => {
        //let usr = addUser(x);
        redirectToAvailability()
        //window.location.href = "availability.html";
        //redirectToAvailability();
        return x;
      })
      .then(x => {
        
        callToAvail(x);
      });
  }

  MeetingButton();
};

function addUser(userObj) {
  const scheduleID = userObj.scheduleID,
    name = userObj.name,
    email = userObj.email,
    sendObj = {
      scheduleID: scheduleID,
      name: name,
      email: email
    },
    bodyNew = JSON.stringify(sendObj);

  console.log("body new" + bodyNew);

  fetch("/add", {
    method: "POST",
    bodyNew,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log("user info" + json);
    });
}

function loginButton() {
  const button = document.getElementById("submit-login");
  button.addEventListener("click", e => {
    e.preventDefault();
  });
  var x = document.getElementById("schedule-id").value;
  var y = document.getElementById("name").value;
  var z = document.getElementById("email").value;

  //make sure text input isn't empty
  if (x == "") {
    alert("Please enter a Schedule ID before continuing");
    return false;
  }
  if (y == "") {
    alert("Please enter a name before continuing");
    return false;
  }
  if (z == "") {
    alert("Please enter a email before continuing");
    return false;
  }

  //{scheduleID:'', name: “”, email: “”, weekday: “”, color:””, timespan: “”, comments: “”}
  const scheduleID = document.querySelector("#schedule-id"),
    name = document.querySelector("#name"),
    email = document.querySelector("#email"),
    json = {
      scheduleID: scheduleID.value,
      name: name.value,
      email: email.value,
      days: ""
    },
    body = JSON.stringify(json);

  fetch("/add", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      //using our schedID get the meeting info
      var meetObj = getID(json.scheduleID);
      return meetObj;
    })
    .then(json => {
      //using meeting info send to Avail to create the table
      callToAvail(json);
    });
}

/////////////STUFF TO USE BOTH IN AVAIL AND LOGIN///////
const getID = function(ID) {
  const json = { scheduleID: ID },
    body = JSON.stringify(json);

  fetch("/getMeeting", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      return json;
    });
};

////////////AVAILABILITY SCRIPT//////////////////////

//Uncaught (in promise) TypeError: Cannot read property 'createTHead' of null
//    at loadCalendar (VM22208 scriptsCombined.js:247)
//   at callToAvail (VM22208 scriptsCombined.js:308)
//   at VM22208 scriptsCombined.js:117

const get = function() {
  const available = document.getElementById("available"),
    tentative = document.getElementById("tentative"),
    busy = document.getElementById("busy");
  let status = "";

  if (available.checked) {
    status = "available";
    return status;
  } else if (tentative.clicked) {
    status = "tentative";
    return status;
  } else {
    status = "busy";
    return status;
  }
};

const loadCalendar = function(schedule) {
  //document.getElementbyId("schedule").innerHTML = "loadCalendar is running";
  //create element table

  // get html elements and set status var
  // let table = document.querySelector("table");
  let status = "available";

  let days = schedule.days,
    startTime = schedule.start,
    endTime = schedule.end,
    cellNum = 1;

  console.log(days);
  console.log(startTime);
  console.log("load cal" + endTime);

  var table = makeTable(days, startTime, endTime);
 // document.getElementbyId("calendar").innerHTML = table;
 // console.log("the table is " + table);
  
  //   const table = document.getElementById("calendar");

  //   let dayHeader = table.createTHead(),
  //     dayRow = dayHeader.insertRow(0),
  //     timeCol = dayRow.insertCell(0);

  //   for (let i = 0; i < days.length; i++) {
  //     let newDay = dayRow.insertCell(cellNum);
  //     cellNum++;

  //     if (days[i] == "0") {
  //       newDay.innerHTML = "Monday";
  //     } else if (days[i] == "1") {
  //       newDay.innerHTML = "Tuesday";
  //     } else if (days[i] == "2") {
  //       newDay.innerHTML = "Wednesday";
  //     } else if (days[i] == "3") {
  //       newDay.innerHTML = "Thursday";
  //     } else if (days[i] == "4") {
  //       newDay.innerHTML = "Friday";
  //     } else if (days[i] == "5") {
  //       newDay.innerHTML = "Saturday";
  //     } else if (days[i] == "6") {
  //       newDay.innerHTML = "Sunday";
  //     }
  //   }

  //   for (let t = startTime; t <= endTime; t++) {
  //     let newTimeRow = table.insertRow(-1),
  //       time = newTimeRow.insertCell(0);

  //     for (let d = 1; d < cellNum; d++) {
  //       let cell = newTimeRow.insertCell(d);

  //       cell.style.cursor = "pointer";

  //       cell.addEventListener("click", function() {
  //         console.log(status);

  //         if (status == "available") {
  //           cell.style.backgroundColor = "lightgreen";
  //         } else if (status == "tentative") {
  //           cell.style.backgroundColor = "lightblue";
  //         } else if (status == "busy") {
  //           cell.style.backgroundColor = "coral";
  //         }
  //       });
  //     }

  //     if (t == 0) {
  //       time.innerHTML = "12 AM";
  //     } else if (t > 0 && t < 12) {
  //       time.innerHTML = t + " AM";
  //     } else if (t == 12) {
  //       time.innerHTML = "12 PM";
  //     } else if (t > 12 && t < 24) {
  //       time.innerHTML = t - 12 + " PM";
  //     }
  //  }

  //   for (let t = startTime; t <= endTime; t++) {
  //   let newTimeRow = table.insertRow(-1),
  //   time = newTimeRow.insertCell(0);

  //      for (let d = 1; d < cellNum; d++) {
  //      let cell = newTimeRow.insertCell(d);

  //        cell.style.cursor = "pointer";

  //      cell.addEventListener("click", function() {
  //      console.log(status);

  //    status = getStatus();

  //   if (status == "available") {
  //   cell.style.backgroundColor = "lightgreen";
  //          } else if (status == "tentative") {
  //          cell.style.backgroundColor = "lightblue";
  //      } else if (status == "busy") {
  //      cell.style.backgroundColor = "coral";
  //   }
  //        });
  //    }

  //      if (t == 0) {
  //      time.innerHTML = "12 AM";
  //      } else if (t > 0 && t < 12) {
  //      time.innerHTML = t + " AM";
  //   } else if (t == 12) {
  //       time.innerHTML = "12 PM";
  //   } else if (t > 12 && t < 24) {
  //      time.innerHTML = t - 12 + " PM";
  //     }
  //   }
};

const callToAvail = function(meetingObj) {
  //var intNum = redirectToAvailability();
  //the code doesn't run past this redirect????
  //document.getElementbyId("chat").innerHTML = "is this code executing???";

  console.log("meetingObj is" + meetingObj);
  // load a given calendar with days and times
  loadCalendar(meetingObj);
};

function redirectToAvailability() {
  window.location.href = "availability.html";
  return 0
}

////////////RETURN TO HOME//////////////////////
function callHome() {
  window.location.href = "index.html";
}

function makeTable(days, start, end) {
  
  var myTableRows = makeArray(days, start, end);
  //this returns the right thing
  console.log("return arr");
  console.log(myTableRows);
  
  var table = document.createElement("table");
  for (var rowIndex in myTableRows) {
    var row = document.createElement("tr");
    for (var colIndex in myTableRows[rowIndex]) {
      for (var tag in myTableRows[rowIndex][colIndex]) {
        var cell = document.createElement(tag);
        var cellContents = document.createTextNode(
          myTableRows[rowIndex][colIndex][tag]
        );
        cell.appendChild(cellContents);
        row.appendChild(cell);
      }
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);
  return table;
}

function makeArray(days, start, end) {
  var nameDays = [];
  var finalArray = [];

  console.log("in Make Array");
  console.log(days.length);

  for (var i = 0; i < days.length; i++) {
    console.log("in loop");
    if (days[i] == "0") {
      nameDays.push("Sunday");
    } else if (days[i] == "1") {
      nameDays.push("Monday");
    } else if (days[i] == "2") {
      nameDays.push("Tuesday");
    } else if (days[i] == "3") {
      nameDays.push("Wednesday");
    } else if (days[i] == "4") {
      nameDays.push("Thursday");
    } else if (days[i] == "5") {
      nameDays.push("Friday");
    } else {
      nameDays.push("Saturday");
    }
  }
  console.log("Weekdays");
  console.log(nameDays);

  var str = "";
  var midArray = [];

  var temp = { th: "" };
  //console.log(temp)
  midArray.push(temp);

  for (var k = 0; k < nameDays.length; k++) {
    str = { th: nameDays[k] };
    // console.log(str)
    midArray.push(str);
  }

  finalArray.push(midArray);

  //console.log("FinalArray")
  //console.log(finalArray)
  //headers are now done
  midArray = [];
  
  var timeSpan = end - start
  for(var f = 0; f< timeSpan; f++){
    //console.log("time loop");
    var timeStr = { th: ""};
    //console.log(timeStr);
    midArray.push(timeStr);

    for (var a = 0; a < days.length; a++) {
      timeStr = { td: "" };
      console.log(timeStr);
      midArray.push(timeStr);
    }
   // console.log("numbers");
    //console.log(midArray);

    finalArray.push(midArray);
    midArray = [];
  }

  return finalArray;
}

function availabilityButton() {
  const abutton = document.getElementById("submit-availability");
  abutton.addEventListener("click", e => {
    e.preventDefault();
  });
  var statusData = collectAvailabilityData();
  //store statusData, scheduleID, and username so they can be retrieved by scheduling page.
  //scheduling wants an array of [name, statusData]
  callToScheduling();
}

const collectAvailabilityData = function() {
  var cal = document.getElementById("calendar");
  var statusData = []
  //skip col and row headers
  for (var i = 1, row; row = cal.rows[i]; i++) {
     var rowStatus = []
     for (var j = 1, col; col = row.cells[j]; j++) {
       rowStatus.push(statusToValue(row.cells[j]))
     }  
    statusData.push(rowStatus);
  }
  return statusData;
}

function statusToValue(status) {
  if (status == "available") {
    return 1;
  } else if (status == "tentative") {
    return 0.5;
  } else if (status == "busy") {
    return 0;
  } else {
    return 0; //assuming default/unset as busy
  }
}

//functions for schedule page colors
function calcPartitions(numColors) {
  if (numColors <= 1) {
    return [50];
  } else {
    var p = 100 / (numColors - 1);
    var splits = [];
    for (var i = 0; i < numColors; i++) {
      splits.push(p * i);
    }
    return splits;
  }
}
function weightColors(p, color1, color2) {
  var p2 = 100 - p;
  var r = Math.round((color1[0] * p + color2[0] * p2) / 100).toString(16);
  var g = Math.round((color1[1] * p + color2[1] * p2) / 100).toString(16);
  var b = Math.round((color1[2] * p + color2[2] * p2) / 100).toString(16);
  if (r.length < 2) {
    r = "0" + r;
  }
  if (g.length < 2) {
    g = "0" + g;
  }
  if (b.length < 2) {
    b = "0" + b;
  }
  return "#" + r + g + b;
}
function makeBar(colArray) {
  var ctable = "<table><th><td>All Available</td></th>";
  for (var i = colArray.length - 1; i >= 0; i++) {
    ctable +=
      "<tr><td style='background-color: " + colArray[i] + "'></td></tr>";
  }
  ctable += "<th><td>None Available</td></th></table>";
  document.getElementById("colorbar").innerHTML = ctable;
}
function calcColors(numPeople, color1, color2) {
  var splits = calcPartitions(numColors);
  var colors = [];
  var numColors = numPeople * 2 + 1;
  for (var k = 0; k < numColors; k++) {
    colors.push(weightColors(splits[k], color1, color2));
  }
  return colors;
}

function getColor(val, colArray) {
  return colArray[val * 2];
}

////CallToScheduling\\\\
const callToScheduling = function() {
  window.location.href = "scheduling.html";
  var scheds = fetch("/getSched").then(response => response.json()); 
  var availabilities = [[[]]]; //get the availability data- array of people with 2d arrays of their statuses
  let days = scheds[0].days,
    startTime = scheds[0].start,
    endTime = scheds[0].end;

  makeTable(days, startTime, endTime);
  //colors for availability gradient
  var color1 = [255, 255, 255]; //all available
  var color2 = [0, 0, 0]; //none available
  var colorArray = calcColors(scheds.length, color1, color2); //scheds.length should be the number of people
  makeBar(colorArray);
  var avails = restructureAvails(availabilities);
  populateTable(avails, colorArray);
  addListeners(avails);
};

//support functions for scheduling page
const populateTable = function(schedules, colorArray) {
  //need data from availability page, status of each block in the table!!!!
  //status values: busy=0,tentative=0.5,available=1

  var table = document.getElementById("availTable");
  for (var d=0; d< schedules.length; d++) {
    for (var b=0; b < schedules[d].length; b++) {
      var aColor = getColor(schedules[d][b][0], colorArray);
      table[d][b].style.backgroundColor = aColor;
    }
  }
};

const restructureAvails= function(avail) { //create array of [day[time[[availPeople],[tentPeople],[busyPeople]]]]
  var r = [];
  //initialize
  for (var days in r[0]){
    var day = [];
    for (var blocks in r[0][0]) {
        day.push([0,[],[],[]]); //statusvalue, availablePeople, tentativePeople, busyPeople
    }
    r.push(day);
  }
  for (var person in avail) {
    for (var d=0; d < person[1].length; d++) {
      for (var b=0; b < person[1][d].length; b++) {
        var val = person[1][d][b];
        r[d][b][0] += val;
        if (val == 1) {
          r[d][b][1].push(person[0]);
        } else if (val == 0.5) {
          r[d][b][2].push(person[0]);
        } else if (val == 0) {
          r[d][b][3].push(person[0]);
        }
      }
    }
  }
  return r;
}

//functions to display available/tentative/busy people when you click on a cell
const addListeners = function(avails) {
  var table = document.getElementById("availTable");
  var rows = table.rows.length;
  var cols = table.rows.cells.length;
  for (var d = 0; d<rows; d++) {
    for (var b=0; b<rows; b++) {
      table[d][b].addEventListener("click", function() {displayPeople(avails[d][b])})
    }
  }
}

const displayPeople = function(block) {
  document.getElementById("listAvailPeople").innerHTML = block[1];
  document.getElementById("listFlexPeople").innerHTML = block[2];
  document.getElementById("listBusyPeople").innerHTML = block[3];
}