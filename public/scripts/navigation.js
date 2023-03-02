import { handleEvents, displayPages } from "./mainFunctions"; 

// DOM for when logging in and sign up
// Get login buttons and attach event listeners
var loginButtons = document.getElementsByClassName("LoginContainer")[0].children;
handleEvents(loginButtons[0], "click", displayLandingPageForms, "add", [], true);
Array(...document.getElementsByClassName("other-opt")).forEach((element) => {
  handleEvents(element.children[0], "click", displayLandingPageForms, "add", [], true);
});
handleEvents(loginButtons[1].children[0], "click", displayLandingPageForms, "add", [], true);

function displayLandingPageForms(el) {
  // Get the login and signup forms from the DOM
  var loginForm = document.getElementsByClassName("login-form")[0];
  var signupForm = document.getElementsByClassName("signup-form")[0];

  // Hide the title after forms appear on mobile screens
  document
    .getElementsByClassName("homePage")[0]
    .children[0].setAttribute("displayedOnMobile", false);

  // Show the appropriate login/signup button
  loginButtons[2].style.display = "block";
  loginButtons[0].style.display = "none";
  loginButtons[1].style.display = "none";

  // Adjust the border radius of the button container
  loginButtons[0].parentElement.style.borderRadius = "50px";

  // If the login button was clicked, show the login form and fade it in
  if (el == loginButtons[0] || el == document.getElementsByClassName("login-opt")[0].children[0]) {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    setTimeout(() => {
      loginForm.style.opacity = 1;
    }, 100);
  }
  // If the signup button was clicked, show the signup form and fade it in
  else if (
    el == loginButtons[1].children[0] ||
    el == document.getElementsByClassName("signup-opt")[0].children[0]
  ) {
    signupForm.style.display = "block";
    Array(...signupForm.getElementsByTagName("input")).forEach((input) => {
      input.value = "";
    });
    signupForm.getElementsByTagName("span")[0].style.display = "none";
    loginForm.style.display = "none";
    setTimeout(() => {
      signupForm.style.opacity = 1;
    }, 100);
  }
}
// get all elements with the class 'arrow' from the DOM
var arrow = document.getElementsByClassName("arrow");
// loop through each 'arrow' element and assign events to its parent node
Array(...arrow).forEach((element) => {
  // get the parent node of the 'arrow' element
  var parent = element.parentNode;
  // set the parent node's position and display properties
  parent.style.marginBottom = element.dataset.yPos;
  parent.style.marginTop = "10px";
  parent.style.marginLeft = "5%";
  parent.style.left = element.dataset.xPos;
  parent.style.width = "clamp(75px, 26%, 80px)";
  parent.style.overflowX = "visible";
  parent.style.zIndex = 2;
  parent.style.display = "none";
  parent.style.cursor = "pointer";
  parent.style.textAlign = "left";
  // get the list of targets to be closed by clicking on the arrow
  var closedTargets = element.dataset.closeTarget.split(",");
  // get the list of targets to be opened by clicking on the arrow
  var openTargets = element.dataset.openTarget.split(",");
  // get the display types for the open targets
  var displayTypes = element.dataset.displayType.split(",");
  // check if there are any exclusive targets that should be handled separately
  var exclusionIndexArr;
  var exclusiveTargetsArr = [];
  if (element.dataset.opentargetExclusive.length > 0) {
    // if there are exclusive targets, get their indices and remove them from the openTargets list
    exclusionIndexArr = JSON.parse(element.dataset.opentargetExclusive);
    exclusionIndexArr.forEach((index) => {
      var target = openTargets.splice(index, 1);
      exclusiveTargetsArr.push(target);
    });
    // loop through the exclusive targets and assign the click event to each one
    exclusiveTargetsArr.forEach((target) => {
      handleEvents(
        parent,
        "click",
        function (element, specificArrow) {
          switch (Array(...arrow).indexOf(specificArrow)) {
            case 0:
              element.removeAttribute("displayedOnMobile");
              break;
          }
        },
        "add",
        [document.querySelector(target), element]
      );
    });
  }
  // assign the click event to all open targets and closed targets
  for (var r = 0; r < closedTargets.length; r++) {
    for (var c = 0; c < openTargets.length; c++) {
      handleEvents(parent, "click", displayPages, "add", [
        document.querySelector(closedTargets[r]),
        document.querySelector(openTargets[c]),
        displayTypes[c],
      ]);
    }
  }
  // assign the click event to hide the parent node when it is clicked
  handleEvents(
    parent,
    "click",
    function (el) {
      el.style.display = "none";
    },
    "add",
    [],
    true
  );
});

// This function is called when the user clicks on the dashboard button
function displayDashBoard() {
  // Hide the home page and display the dashboard
  document.getElementsByClassName("homePage")[0].style.display = "none";
  document.getElementsByClassName("dashboard")[0].style.display = "block";
  // Set the background of the body element
  document.body.style.backgroundImage = "none";
  document.body.style.background = "linear-gradient(30deg, #205da4, #07f1f1)";
} 
//display schoolCodeForm
handleEvents(
  document.querySelector("div.schoolCodePage > div.LoginContainer > button:first-of-type"),
  "click",
  function () {
    document.querySelector("div.schoolCodePage > div.LoginContainer").children[4].style.display =
      "block";
    for (var i = 0; i < 4; i++) {
      //display addCodeForm
      displayPages(
        document.querySelector("div.schoolCodePage > div.LoginContainer").children[i],
        document.getElementsByClassName("addCodeForm")[0],
        "flex"
      );
    }
  }
);
handleEvents(
  document.querySelector("div.schoolCodePage > div.LoginContainer > button:nth-child(4)"),
  "click",
  function () {
    document.querySelector("div.schoolCodePage > div.LoginContainer").children[4].style.display =
      "block";
    for (var i = 0; i < 4; i++) {
      displayPages(
        document.querySelector("div.schoolCodePage > div.LoginContainer").children[i],
        document.getElementsByClassName("createSchoolForm")[0],
        "flex"
      );
    }
  }
);
var minGradeInput = document.getElementsByClassName("lowestGradeLvlInput")[0];
var maxGradeInput = document.getElementsByClassName("highestGradeLvlInput")[0];
function imposeMinMaxGrades(el) {
  setTimeout(function () {
    minGradeInput.max = parseInt(maxGradeInput.value);
    maxGradeInput.min = parseInt(minGradeInput.value);
    if (minGradeInput.max == NaN) {
      minGradeInput.max = 12;
    }
    if (maxGradeInput.min == NaN) {
      maxGradeInput.min = 1;
    }
    imposeMinMax(el);
  }, 850);
}
function imposeMinMax(el) {
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
}
minGradeInput.oninput = function () {
  imposeMinMaxGrades(minGradeInput);
};
maxGradeInput.oninput = function () {
  imposeMinMaxGrades(maxGradeInput);
}; 


