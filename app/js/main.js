// Elements
const body = document.getElementById("body");
const container = document.querySelector(".container");
const allLinks = document.getElementsByTagName("a");
const overlay = document.querySelector(".overlay");
const overlayText = document.querySelector(".overlay_text");

// Section elements
const start = document.getElementById("start");
const about = document.getElementById("about");
const projects = document.getElementById("projects");
const contact = document.getElementById("contact");
const sectionTitle = document.querySelector(".section_title_start");
const sectionSubtitle = document.querySelector(".section_subtitle_start");

// Nav elements
const navList = document.querySelector(".nav_list");
const navLinkStart = document.querySelector(".nav_link_start");
const navLinks = document.querySelectorAll(".nav_link");
const hamburger = document.querySelector(".nav_hamburger");
const closeHamburger = document.querySelector(".nav_close_menu");

// Footer stuff
const footer = document.querySelector(".footer");
const footYear = document.getElementById("foot_year");
const footLink = document.querySelector(".foot_link");

// Projects elements
const projectTitle = document.querySelectorAll(".projects_title");
const projectTag = document.querySelectorAll(".projects_tag");
const projectPhoto = document.querySelectorAll(".projects_photo");
const projectsLinks = document.querySelectorAll(".projects_link");
const navInfo = document.querySelector(".projects_nav_info");
const prev = document.querySelector(".projects_prev");
const next = document.querySelector(".projects_next");

// Form elements
const form = document.querySelector(".form");
const formButton = document.querySelector(".form__button");
const inputMail = document.querySelector(".form__input--mail");
const inputPhone = document.querySelector(".form__input--phone");
const textarea = document.querySelector(".form__textarea");
const inputFail = document.getElementsByClassName("input__fail");

// Form RegEx checks
const checkPhone = /(^[5-9]{1}[0-9]{8}$)|(^$)/;
const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

// Mobile menu showing hamburger

hamburger.addEventListener("click", () => {
  hamburger.style.display = "none";
  closeHamburger.style.display = "block";
  navList.classList.add("nav_list_expanded");
});

closeHamburger.addEventListener("click", () => {
  hamburger.style.display = "block";
  closeHamburger.style.display = "none";
  navList.classList.remove("nav_list_expanded");
});

for (let link of navLinks) {
  link.addEventListener("click", e => {
    checkHashAndHideSections(e);
    if (window.matchMedia("(max-width: 851px)").matches) {
      hamburger.style.display = "block";
      closeHamburger.style.display = "none";
      navList.classList.remove("nav_list_expanded");
    } else {
      return;
    }
  });
}

navLinkStart.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 851px)").matches) {
    if (navList.classList.contains("nav_list_expanded")) {
      navList.classList.remove("nav_list_expanded");
      hamburger.style.display = "block";
      closeHamburger.style.display = "none";
    } else {
      return;
    }
  } else {
    return;
  }
});

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
  contact.classList.add("visuallyhidden_section")
}

function showAbout() {
  start.classList.add("visuallyhidden_section");
  about.classList.remove("visuallyhidden_section");
  projects.classList.add("visuallyhidden_section");
  contact.classList.add("visuallyhidden_section");
}

function showProjects() {
  start.classList.add("visuallyhidden_section");
  about.classList.add("visuallyhidden_section");
  projects.classList.remove("visuallyhidden_section");
  contact.classList.add("visuallyhidden_section");
}

function showContact() {
  start.classList.add("visuallyhidden_section");
  about.classList.add("visuallyhidden_section");
  projects.classList.add("visuallyhidden_section");
  contact.classList.remove("visuallyhidden_section");
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
  } else if (window.location.hash === "#contact") {
    overflowOn();
    showContact();
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
    this.slides = document.querySelectorAll(".projects_project");
    let currentActiveSlide = this.slides.item(this.currentSlide);
    for (let slide of this.slides) {
      slide.classList.remove("projects_project_active");
    }
    currentActiveSlide.classList.add("projects_project_active");
    for (let link of projectsLinks) {
      link.setAttribute("tabIndex", "-1");
    }
    // TODO: 
    // Need to improve that so that it works only in projects section
    let activeLinks = currentActiveSlide.querySelectorAll(".projects_link");
    for (let link of activeLinks) {
      link.setAttribute("tabIndex", "0");
    }
    // Disable or enable nav buttons depending of current slide index
    if (this.currentSlide === 0) {
      prev.classList.add("projects_prev_disabled");
      navInfo.classList.remove("projects_nav_info_hidden");
    } else if (this.currentSlide === 8) {
      next.classList.add("projects_next_disabled");
    } else {
      navInfo.classList.add("projects_nav_info_hidden");
      prev.classList.remove("projects_prev_disabled");
      next.classList.remove("projects_next_disabled");
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

// Form validation

// function validateForm() {
//   let emailValue = inputMail.value;
//   let phoneValue = inputPhone.value;
//   let message = textarea.value;
//   inputMail.classList.remove("form_input_invalidated");
//   inputPhone.classList.remove("form_input_invalidated");
//   textarea.classList.remove("form_input_invalidated");
//   if (checkMail.test(emailValue) === false) {
//     const mailFailPL = "Podaj prawidłowy adres e-mail";
//     const mailFailENG = "Please provide a valid email address";
//     let newP = document.createElement("p");
//     newP.classList.add("input_fail");
//     newP.classList.add("fade-in-short");
//     inputMail.classList.add("form_input_invalidated");
//     if (langPL.classList.contains("button_lang_active")) {
//       newP.textContent = mailFailPL;
//     } else {
//       newP.textContent = mailFailENG;
//     }
//     document.querySelector(".form_group_mail").appendChild(newP);
//   }
//   if (checkPhone.test(phoneValue) === false) {
//     const phoneFailPL = "Podaj prawidłowy numer telefonu";
//     const phoneFailENG = "Please provide a valid mobile number";
//     let newP = document.createElement("p");
//     newP.classList.add("input_fail");
//     newP.classList.add("fade-in-short");
//     inputPhone.classList.add("form_input_invalidated");
//     if (langPL.classList.contains("button_lang_active")) {
//       newP.textContent = phoneFailPL;
//     } else {
//       newP.textContent = phoneFailENG;
//     }
//     document.querySelector(".form_group_phone").appendChild(newP);
//   } 
//   if (message === "") {
//     const msgFailPL = "Wiadomość nie może być pusta";
//     const msgFailENG = "The message cannot be empty";
//     let newP = document.createElement("p");
//     newP.classList.add("input_fail");
//     newP.classList.add("fade-in-short");
//     textarea.classList.add("form_input_invalidated");
//     if (langPL.classList.contains("button_lang_active")) {
//       newP.textContent = msgFailPL;
//     } else {
//       newP.textContent = msgFailENG;
//     }
//     document.querySelector(".form_group_msg").appendChild(newP);
//   } if (checkMail.test(emailValue) && checkPhone.test(phoneValue) && message) {
//     return true;
//   }
// }

// form.addEventListener("submit", e => {
//   e.preventDefault();
//   for (let i = inputFail.length; i--; ) {
//     inputFail[i].remove();
//   }
//   if (validateForm()) {
//     const formData = new FormData(form);
//     const xhr = new XMLHttpRequest();
//     xhr.addEventListener("error", () => {
//       const failPL = "Nie udało się, spróbuj jeszcze raz.";
//       const failENG = "Something went wrong, please try again.";
//       const postFail = document.createElement("div");
//       const failText = document.createElement("p");
//       postFail.classList.add("form_fail");
//       postFail.classList.add("fade-in-out");
//       if (langPL.classList.contains("button_lang_active")) {
//         failText.textContent = failPL;
//         postFail.appendChild(failText);
//         form.appendChild(postFail);
//       } else {
//         failText.textContent = failENG;
//         postFail.appendChild(failText);
//         form.appendChild(postFail);
//       }
//       setTimeout(() => {
//         postFail.remove();
//       }, 4000)
//     });
//     xhr.addEventListener("load", () => {
//       const successPl = "Dziękuję za wiadomość!";
//       const successENG = "Thank you for your message!";
//       const postSuccess = document.createElement("div");
//       const successText = document.createElement("p");
//       postSuccess.classList.add("form_success");
//       postSuccess.classList.add("fade-in-out");
//       form.reset();
//       if (langPL.classList.contains("button_lang_active")) {
//         successText.textContent = successPl;
//         postSuccess.appendChild(successText);
//         form.appendChild(postSuccess);
//       } else {
//         successText.textContent = successENG;
//         postSuccess.appendChild(successText);
//         form.appendChild(postSuccess);
//       }
//       setTimeout(() => {
//         postSuccess.remove();
//       }, 4000)
//     });
//     xhr.open("POST", form.action);
//     xhr.send(formData);
//   }
// });
