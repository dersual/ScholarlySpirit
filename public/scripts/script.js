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

//landing page login and sign up DOM
var loginButtons = document.getElementsByClassName("LoginContainer")[0].children;
handleEvents(loginButtons[0], "click", displayLandingPageForms);
handleEvents(loginButtons[1].children[0], "click", displayLandingPageForms);
function displayLandingPageForms() {
  var loginForm = document.getElementsByClassName("login-form")[0]; 
  var signupForm = document.getElementsByClassName("signup-form")[0]
  console.log(loginButtons);
  loginButtons[0].style.display = "none";
  loginButtons[1].style.display = "none";
  if (this == loginButtons[0]) {
    loginForm.style.display = "block";
    setTimeout(() => { 
      loginForm.style.animation = "fadein 1.2s ease-in" 
    }, 500);
  } else if (this == loginButtons[1].children[0]) { 
    signupForm.style.display = "block";
    setTimeout(() => { 
      signupForm.style.animation = "fadein 1.2s ease-in" 
    }, 500);
  }
}
