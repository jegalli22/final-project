// get html elements and set status var
const table = document.getElementById("calendar"),
  available = document.getElementById("available"),
  tentative = document.getElementById("tentative"),
  busy = document.getElementById("busy");
let status = "available";

const getID = function(ID){
    const json = {scheduleID: ID},
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
        loadCalendar(json)
    });

}

// load a given calendar with days and times
const loadCalendar = function(schedule) {
  let days = schedule.days,
    startTime = schedule.start,
    endTime = schedule.end,
    cellNum = 1;

  let dayHeader = table.createTHead(),
    dayRow = dayHeader.insertRow(0),
    timeCol = dayRow.insertCell(0);

  for (let i = 0; i < days.length; i++) {
    let newDay = dayRow.insertCell(cellNum);
    cellNum++;

    if (days[i].getDay() == "0") {
      newDay.innerHTML = "Monday";
    } else if (days[i].getUTCDay() == "1") {
      newDay.innerHTML = "Tuesday";
    } else if (days[i].getUTCDay() == "2") {
      newDay.innerHTML = "Wednesday";
    } else if (days[i].getUTCDay() == "3") {
      newDay.innerHTML = "Thursday";
    } else if (days[i].getUTCDay() == "4") {
      newDay.innerHTML = "Friday";
    } else if (days[i].getUTCDay() == "5") {
      newDay.innerHTML = "Saturday";
    } else if (days[i].getUTCDay() == "6") {
      newDay.innerHTML = "Sunday";
    }
  }

  for (let t = startTime; t <= endTime; t++) {
    let newTimeRow = table.insertRow(-1),
      time = newTimeRow.insertCell(0);

    for (let d = 1; d < cellNum; d++) {
      let cell = newTimeRow.insertCell(d);

      cell.style.cursor = "pointer";

      cell.addEventListener("click", function() {
        console.log(status);

        if (status == "available") {
          cell.style.backgroundColor = "lightgreen";
        } else if (status == "tentative") {
          cell.style.backgroundColor = "lightblue";
        } else if (status == "busy") {
          cell.style.backgroundColor = "coral";
        }
      });
    }

    if (t == 0) {
      time.innerHTML = "12 AM";
    } else if (t > 0 && t < 12) {
      time.innerHTML = t + " AM";
    } else if (t == 12) {
      time.innerHTML = "12 PM";
    } else if (t > 12 && t < 24) {
      time.innerHTML = t - 12 + " PM";
    }
  }
};

available.addEventListener("click", function() {
  status = "available";
});

tentative.addEventListener("click", function() {
  status = "tentative";
});

busy.addEventListener("click", function() {
  status = "busy";
});

