let table = document.getElementById("calendar"),
  available = document.getElementById("available"),
    tentative = document.getElementById("tentative"),
    busy = document.getElementById("busy"),
    status = "available";

const loadCalendar = function(days, startTime, endTime) {
  let cellNum = 1;

  let dayHeader = table.createTHead(),
    dayRow = dayHeader.insertRow(0),
    timeCol = dayRow.insertCell(0);

  for (let i = 0; i < arr.length; i++) {
    let newDay = dayRow.insertCell(cellNum);
    cellNum++;

    if (arr[i].getDay() == 0) {
      newDay.innerHTML = "Sunday";
    } else if (arr[i].getUTCDay() == 1) {
      newDay.innerHTML = "Monday";
    } else if (arr[i].getUTCDay() == 2) {
      newDay.innerHTML = "Tuesday";
    } else if (arr[i].getUTCDay() == 3) {
      newDay.innerHTML = "Wednesday";
    } else if (arr[i].getUTCDay() == 4) {
      newDay.innerHTML = "Thursday";
    } else if (arr[i].getUTCDay() == 5) {
      newDay.innerHTML = "Friday";
    } else if (arr[i].getUTCDay() == 6) {
      newDay.innerHTML = "Saturday";
    }
  }

  for (let t = startTime; t <= endTime; t++) {
    let newTimeRow = table.insertRow(-1),
      time = newTimeRow.insertCell(0);

    for (let d = 1; d < cellNum; d++) {
      let cell = newTimeRow.insertCell(d);
      
      cell.style.cursor = "pointer";

      cell.addEventListener("click", function() {
        console.log(status)
        
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

let date1 = new Date(2020, 5, 0);
let date2 = new Date(2020, 5, 1);
let date3 = new Date(2020, 5, 3);

let arr = [date1, date2, date3];

window.onload = loadCalendar(arr, 9, 17);