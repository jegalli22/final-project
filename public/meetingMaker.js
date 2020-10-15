////////code in meetingMaker
var schedID = ''

let mon = document.querySelector("input[name=checkbox]"),
  tue = document.querySelector("#weekday-tue"),
  wed = document.querySelector("#weekday-wed"),
  thu = document.querySelector("#weekday-thu"),
  fri = document.querySelector("#weekday-fri"),
  sat = document.querySelector("#weekday-sat"),
  sun = document.querySelector("#weekday-sun");

let daysOfWeek = [];

mon.addEventListener("change", function() {
  if (daysOfWeek.indexOf("0") == -1) {
    daysOfWeek.push("0");
    console.log(daysOfWeek);
  }
});

tue.addEventListener("change", function() {
  if (daysOfWeek.indexOf("1") == -1) {
    daysOfWeek.push("1");
    console.log(daysOfWeek);
  }
});

wed.addEventListener("change", function() {
  if (daysOfWeek.indexOf("2") == -1) {
    daysOfWeek.push("2");
    console.log(daysOfWeek);
  }
});

thu.addEventListener("change", function() {
  if (daysOfWeek.indexOf("3") == -1) {
    daysOfWeek.push("3");
    console.log(daysOfWeek);
  }
});

fri.addEventListener("change", function() {
  if (daysOfWeek.indexOf("4") == -1) {
    daysOfWeek.push("4");
    console.log(daysOfWeek);
  }
});

sat.addEventListener("change", function() {
  if (daysOfWeek.indexOf("5") == -1) {
    daysOfWeek.push("5");
    console.log(daysOfWeek);
  }
});

sun.addEventListener("change", function() {
  if (daysOfWeek.indexOf("6") == -1) {
    daysOfWeek.push("6");
    console.log(daysOfWeek);
  }
});

////times of day

var startTime = document.getElementById("startTime");
var start = null;

var endTime = document.getElementById("endTime");
var end = null;

startTime.addEventListener(
  "input",
  function() {
    start = startTime.value;
  },
  false
);

endTime.addEventListener(
  "input",
  function() {
    end = endTime.value;
  },
  false
);

function MeetingButton() {
  console.log('days array ' + daysOfWeek);
  
  
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
  
  
  //{name: “”, email: “”, days: “”, start:””, end: “”}
  const name = document.querySelector("#name"),
    email = document.querySelector("#email"),
    json = {
      name: name.value,
      email: email.value,
      days: daysOfWeek,
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
      //at this point redirect to avail page
      console.log('schId from meetingmaker ' + json.scheduleID)
      schedID = json.scheduleID
      window.location.href = "availability.html";
      // reset form
    });
}
