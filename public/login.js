const generateForm = document.querySelector("form");

function loginButton(){
  

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
    json = { scheduleID: scheduleID.value, name: name.value, email: email.value },
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
        //at this point redirect to avail page
        window.location.href = "availability.html";
        // reset form
        generateForm.reset();
    });


 }