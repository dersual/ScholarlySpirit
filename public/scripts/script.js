let user = {};
let school = {};

// overall function to handle eventlisteners
/*  
element: html element or elements 
event: Interactive event that runs funct 
funct: the function being run 
type: defaulty is add, but if anything else remove eventlistener 
*/
function handleEvents(element, event, funct, type = "add", params = [], usingThis = false) {
  var newFunct = null;
  if (params.length == 0) {
    if (usingThis) {
      newFunct = function () {
        funct(this);
      };
    }
  } else {
    newFunct = function () {
      funct(...params);
    };
  }
  if (newFunct !== null) {
    if (type == "add") {
      element.addEventListener(event, newFunct);
    } else {
      element.removeEventListener(event, newFunct);
    }
  } else {
    if (type == "add") {
      element.addEventListener(event, funct);
    } else {
      element.removeEventListener(event, funct);
    }
  }
}

//DOM for when logging in and sign up

var loginButtons = document.getElementsByClassName("LoginContainer")[0].children;
handleEvents(loginButtons[0], "click", displayLandingPageForms, "add", [], true);
Array(...document.getElementsByClassName("other-opt")).forEach((element) => {
  console.log(element.children[0]);
  handleEvents(element.children[0], "click", displayLandingPageForms, "add", [], true);
});
handleEvents(loginButtons[1].children[0], "click", displayLandingPageForms, "add", [], true);

function displayLandingPageForms(el) {
  var loginForm = document.getElementsByClassName("login-form")[0];
  var signupForm = document.getElementsByClassName("signup-form")[0];
  document
    .getElementsByClassName("homePage")[0]
    .children[0].setAttribute("displayedOnMobile", false);
  loginButtons[2].style.display = "block";
  loginButtons[0].style.display = "none";
  loginButtons[1].style.display = "none";
  loginButtons[0].parentElement.style.borderRadius = "50px";
  if (el == loginButtons[0] || el == document.getElementsByClassName("login-opt")[0].children[0]) {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    setTimeout(() => {
      loginForm.style.opacity = 1;
    }, 100);
  } else if (
    el == loginButtons[1].children[0] ||
    el == document.getElementsByClassName("signup-opt")[0].children[0]
  ) {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
    setTimeout(() => {
      signupForm.style.opacity = 1;
    }, 100);
  }
}
//DOM of Arrow
Array(...document.getElementsByClassName("arrow")).forEach((element) => {
  var parent = element.parentNode;
  parent.style.position = "absolute";
  parent.style.top = "15px";
  parent.style.left = "20px";
  parent.style.width = "15px";
  parent.style.overflowX = "visible";
  parent.style.display = "none";
});
function displayPages(prevPage, newPage, displayOpt = "block") {
  prevPage.style.display = "none";
  newPage.style.display = displayOpt;
}
function displayDashBoard() {
  document.getElementsByClassName("homePage")[0].style.display = "none";
  document.getElementsByClassName("dashboard")[0].style.display = "block";
  document.body.style.backgroundImage = "none";
  document.body.style.background = "#dddadc";
}
handleEvents(document.getElementsByClassName("signup-form")[0], "submit", onRegister);
async function onLogin() {}
async function onRegister(event) { 
  //fix register
  event.preventDefault();
  try {
    const data = new FormData(document.getElementsByClassName("signup-form")[0]);
    const response = await fetch("/register", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    if (!result.ok) {
      throw new Error(error);
    } else {
      console.log(result);
    }
  } catch (error) {
    if (error == "Account Seems To Have Already Been Made") {
      document
        .getElementsByClassName("signup-form")[0]
        .getElementsByTagName("span")[0].style.display = "block";
    } 
    console.log(error)
  }
}
