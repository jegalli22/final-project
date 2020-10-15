// client-side js, loaded by index.html
// run by the browser each time the page is loaded
const create = document.getElementById("createMeeting"),
  find = document.getElementById("loginMeeting");

create.addEventListener("click", event => {
  window.location.href = "meetingMaker.html";
});

find.addEventListener("click", event => {
  window.location.href = "login.html";
});