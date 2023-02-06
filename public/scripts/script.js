let user = {};
let school = {};

// overall function to handle eventlisteners
/*  
element: html element or elements 
event: Interactive event that runs funct 
funct: the function being run 
type: defaulty is add, but if anything else remove eventlistener 
*/
function handleEvents(element, event, funct, type = "add") {
  if (type == "add") {
    element.addEventListener(event, funct);
  } else {
    element.removeEventListener(event, funct);
  }
}

//DOM for when logging in and sign up 

var loginButtons = document.getElementsByClassName("LoginContainer")[0].children;
handleEvents(loginButtons[0], "click", displayLandingPageForms);
handleEvents(loginButtons[1].children[0], "click", displayLandingPageForms); 
handleEvents(document.getElementsByClassName("anding-page-submit")[0], "click", displayDashBoard)
function displayLandingPageForms() {
  var loginForm = document.getElementsByClassName("login-form")[0];
  var signupForm = document.getElementsByClassName("signup-form")[0];
  console.log(loginButtons);
  loginButtons[0].style.display = "none";
  loginButtons[1].style.display = "none"; 
  loginButtons[0].parentElement.style.borderRadius = "50px"
  if (this == loginButtons[0]) {
    loginForm.style.display = "block";
    setTimeout(() => {
      loginForm.style.opacity = 1;
    }, 100);
  } else if (this == loginButtons[1].children[0]) {
    signupForm.style.display = "block"; 
    setTimeout(() => { 
      signupForm.style.opacity = 1;
    }, 100);
  }
}
function displayDashBoard() { 
  document.getElementsByClassName("homePage")[0].style.display = "none" 
  document.getElementsByClassName("dashboard")[0].style.display = "block"
}