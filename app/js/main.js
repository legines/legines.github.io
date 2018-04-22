// All

// Elements
const overlay = document.querySelector(".overlay");
const overlayText = document.querySelector(".overlay_text");

// Footer stuff
const footer = document.querySelector(".footer");
const footYear = document.getElementById("foot_year");
const footLink = document.querySelector(".foot_link");


// Main function that loads theme settings from localStorage and displays welcome text, and blocks project links
document.addEventListener("DOMContentLoaded", () => {
  checkTime();
  // ageYears();
  hideShow();
  currentYear();
});

window.addEventListener("hashchange", () =>{
  hideShow();
})

// Check what time it is and display welcome text
function checkTime(){
  const date = new Date();
  const currentTime = date.getHours();
  if(currentTime >=6 && currentTime <= 18){
    // overlay.classList.add("day");
    overlayText.textContent = "Welcome";
  }
  else {
    // overlay.classList.add("night");
    overlayText.textContent = "Welcome";
  }
}

// Footy Copyright
function currentYear(){
  const currentDate = new Date(); 
  const currentYear = currentDate.getFullYear();
  footYear.innerHTML = currentYear.toString();
}

// Age 
function age(dateString){
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function ageYears() {
  let myAge = document.querySelector(".myAge");
  myAge.textContent = getAge("1991/05/16");
}

// Trianglify
var pattern = Trianglify({
  width: window.innerWidth,
  height: window.innerHeight,
  variance: "0.23", 
  seed: 'l0qrw', 
  x_colors: 'random',
  cell_size: 40,
}).canvas();
document.body.appendChild(pattern);