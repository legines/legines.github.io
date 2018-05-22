// Elements
const overlay = document.querySelector(".overlay");
const overlayText = document.querySelector(".overlay_text");

// Section elements
const start = document.getElementById("start");
const about = document.getElementById("about");
const projects = document.getElementById("projects");
const contact = "";
const sectionTitle = document.querySelector(".section_title_start");
const sectionSubtitle = document.querySelector(".section_subtitle_start");

// Nav elements
const navLinkStart = document.querySelector(".nav_link_start");

// Footer stuff
const footer = document.querySelector(".footer");
const footYear = document.getElementById("foot_year");
const footLink = document.querySelector(".foot_link");

// Projects elements
const projectTitle = document.querySelectorAll(".projects__title");
const projectTag = document.querySelectorAll(".projects__tag");
const projectPhoto = document.querySelectorAll(".projects__photo");
const projectsLinks = document.querySelectorAll(".projects__link");
const navInfo = document.querySelector(".projects__nav-info");
const prev = document.querySelector(".projects__prev");
const next = document.querySelector(".projects__next");

// Main function that loads theme settings from localStorage and displays welcome text, and blocks project links
document.addEventListener("DOMContentLoaded", () => {
  checkTime();
  ageYears();
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
  if(currentTime >=6 && currentTime <= 12){
    overlayText.textContent = "Good Morning";
  }
  else if(currentTime > 12 && currentTime <= 17){
    overlayText.textContent = "Good Afternoon";
  }
  else if(currentTime > 17 && currentTime <= 20){
    overlayText.textContent = "Good Evening";
  }
  else if(currentTime > 20 && currentTime <= 24){
    overlayText.textContent = "Good Night";
  }
  else {
    overlayText.textContent = "Go to bed";
  }
}

// Footy Copyright date function
function currentYear(){
  const currentDate = new Date(); 
  const currentYear = currentDate.getFullYear();
  footYear.innerHTML = currentYear.toString();
}

// Misc functions
// Age 
function getAge(dateString){
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
  myAge.textContent = getAge("08/27/1989");
}

function overflowOn() {
  body.classList.remove("overflow-off");
  body.classList.add("overflow-on");
}

function overflowOff() {
  body.classList.remove("overflow-on");
  body.classList.add("overflow-off");
}

function showStart() {
  start.classList.remove("visuallyhidden_section");
  about.classList.add("visuallyhidden_section");
  projects.classList.add("visuallyhidden_section");
}

function showAbout() {
  start.classList.add("visuallyhidden_section");
  about.classList.remove("visuallyhidden_section");
  projects.classList.add("visuallyhidden_section");
}

function showProjects() {
  start.classList.add("visuallyhidden_section");
  about.classList.add("visuallyhidden_section");
  projects.classList.remove("visuallyhidden_section");
}

//Removes overlay after animation finishes
overlay.addEventListener("animationend", e =>{
  e.target.style.display = "none";
});

sectionTitle.addEventListener("animationend", e =>{
  e.target.classList.remove("fade-in");
});

sectionSubtitle.addEventListener("animationend", e =>{
  e.target.classList.remove("fade-in");
});

// Show or hide sections and turn overflow on or off based on windows hash 
function hideShow() {
  if (window.location.hash === "#start" || window.location.hash === "") {
    overflowOff();
    showStart();
  } else if (window.location.hash === "#about") {
    overflowOn();
    showAbout();
  } else if (window.location.hash === "#projects") {
    overflowOn();
    showProjects();
  }
};

// Turn on or off overflow-x depending on current hash
function checkHashAndHideSections(e) {
  if (e.target.getAttribute("href") !== "#start") {
    overflowOn();
  } else if (e.target.getAttribute("href") === "#start") {
    overflowOff();
  }
}

navLinkStart.addEventListener("click", checkHashAndHideSections);

// Siema
class mySiema extends Siema {

  checkSlide() {
    // Add or remove an "active" class for current slide
    this.slides = document.querySelectorAll(".projects__project");
    let currentActiveSlide = this.slides.item(this.currentSlide);
    for (let slide of this.slides) {
      slide.classList.remove("projects__project--active");
    }
    currentActiveSlide.classList.add("projects__project--active");
    for (let link of projectsLinks) {
      link.setAttribute("tabIndex", "-1");
    }
    // TODO: 
    // Need to improve that so that it works only in projects section
    let activeLinks = currentActiveSlide.querySelectorAll(".projects__link");
    for (let link of activeLinks) {
      link.setAttribute("tabIndex", "0");
    }
    // Disable or enable nav buttons depending of current slide index
    if (this.currentSlide === 0) {
      prev.classList.add("projects__prev--disabled");
      navInfo.classList.remove("projects__nav-info--hidden");
    } else if (this.currentSlide === 8) {
      next.classList.add("projects__next--disabled");
    } else {
      navInfo.classList.add("projects__nav-info--hidden");
      prev.classList.remove("projects__prev--disabled");
      next.classList.remove("projects__next--disabled");
    }
  }
};

const mySiemaWithDots = new mySiema({
  selector: ".projects",
  duration: 500,
  easing: "cubic-bezier(0.250, 0.100, 0.250, 1.000)",
  perPage: 1,
  draggable: true,
  threshold: 0,
  onInit: function(){
    this.checkSlide();
  },
  onChange: function(){
    this.checkSlide();
  },
});

prev.addEventListener("click", () => mySiemaWithDots.prev());
next.addEventListener("click", () => mySiemaWithDots.next());

document.addEventListener("keyup", (event) => {
  if (window.location.hash === "#projects") {
    if (event.key === "ArrowRight") {
      mySiemaWithDots.next();
    } else if (event.key === "ArrowLeft") {
      mySiemaWithDots.prev();
    }
  }
});
