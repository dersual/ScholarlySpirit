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
var loginButtons = Array(...document.getElementsByClassName("LoginContainer"))[0].children;  
handleEvents() 
function displayLandingPageForms() {  
    var loginForm = Array(...document.getElementsByClassName("login-form"));  
    console.log(loginButtons) 
    loginButtons[0].style.display = "none" 
    loginButtons[1].style.display = "none"
    loginForm[0].style.display = "block";  
    setTimeout(() => { 
        loginForm[0].style.opacity = 1;  
    }, 500)
   
    
}