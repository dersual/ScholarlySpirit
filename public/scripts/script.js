// Declare empty objects for user and school data
let user = {};
let school = {};

// Overall function to handle event listeners
// element: HTML element or elements
// event: Interactive event that runs function
// funct: The function being run
// type: Default is add, but if anything else remove event listener
// params: Array of parameters to pass to funct
// usingThis: Boolean that indicates if 'this' should be passed to funct
function handleEvents(element, event, funct, type = "add", params = [], usingThis = false) {
  var newFunct = null;

  // Check if params array is empty
  if (params.length == 0) {
    // If usingThis is true, create a new function that calls funct with 'this'
    if (usingThis) {
      newFunct = function () {
        funct(this);
      };
    }
  } else {
    // Create a new function that calls funct with parameters from params array
    newFunct = function () {
      funct(...params);
    };
  }

  // If newFunct was created, add or remove the event listener using the new function
  if (newFunct !== null) {
    if (type == "add") {
      element.addEventListener(event, newFunct);
    } else {
      element.removeEventListener(event, newFunct);
    }
  } else {
    // Otherwise, add or remove the event listener using the original function
    if (type == "add") {
      element.addEventListener(event, funct);
    } else {
      element.removeEventListener(event, funct);
    }
  }
}

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
  parent.style.position = "absolute";
  parent.style.top = element.dataset.yPos;
  parent.style.left = element.dataset.xPos;
  parent.style.width = "15px";
  parent.style.overflowX = "visible";
  parent.style.zIndex = 2;
  parent.style.display = "none";
  // get the list of targets to be closed by clicking on the arrow
  var closedTargets = element.dataset.closeTarget.split(",");
  // get the list of targets to be opened by clicking on the arrow
  var openTargets = element.dataset.openTarget.split(",");
  // get the display types for the open targets
  var displayTypes = element.dataset.displayType.split(",");
  // check if there are any exclusive targets that should be handled separately
  var exclusionIndex;
  var exclusiveTargets = [];
  if (element.dataset.opentargetExclusive.length > 0) {
    // if there are exclusive targets, get their indices and remove them from the openTargets list
    exclusionIndex = JSON.parse(element.dataset.opentargetExclusive);
    exclusionIndex.forEach((index) => {
      var target = openTargets.splice(index, 1);
      exclusiveTargets.push(target);
    });
    // loop through the exclusive targets and assign the click event to each one
    exclusiveTargets.forEach((target) => {
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

// function to display pages with a fade-in effect
function displayPages(prevPage, newPage, displayOpt = "block") {
  prevPage.style.opacity = 0;
  prevPage.style.display = "none";
  var opacity = 0;
  newPage.style.opacity = opacity;
  newPage.style.display = displayOpt;
  var intervalID = setInterval(function () {
    if (opacity < 1) {
      opacity = opacity + 0.25;
      newPage.style.opacity = opacity;
    } else {
      clearInterval(intervalID);
    }
  }, 100);
}
// This function is called when the user clicks on the dashboard button
function displayDashBoard() {
  // Hide the home page and display the dashboard
  document.getElementsByClassName("homePage")[0].style.display = "none";
  document.getElementsByClassName("dashboard")[0].style.display = "block";

  // Set the background of the body element
  document.body.style.backgroundImage = "none";
  document.body.style.background = "#dddadc";
}

// This function is called when the user logs in
async function onLogin() {
  // TODO: add login functionality
}

// This function is called when the user submits the signup form
async function setUpUser(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  //display arrow
  arrow[1].parentNode.style.display = "block";
  // Get the form data
  const data = new URLSearchParams(new FormData(document.getElementsByClassName("signup-form")[0]));

  // Send the form data to the server
  await fetch("/setup-user", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      // Check if the response is not OK
      if (!response.ok) {
        // If the response status is 409 (Conflict), display an error message
        if (response.status === 409) {
          document
            .getElementsByClassName("signup-form")[0]
            .getElementsByTagName("span")[0].style.display = "block";
        }
        // Throw an error
        throw new Error(response.statusText);
      } else {
        // If the response is OK, log the response and return the JSON data
        console.log("works");
        console.log(response);
        return response.json();
      }
    })
    .then((data) => {
      // Process the JSON data returned from the server
      displayPages(
        document.getElementsByClassName("homePage")[0],
        document.getElementsByClassName("schoolCodePage")[0]
      );
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("password", data.password);
    })
    .catch((error) => {
      // Log the error
      console.error(error);
      if (error.response) {
        error.json().then((errorMessage) => {
          console.error(errorMessage.error);
        });
      }
    });
}
async function createSchool() {
  var newData = new FormData(document.getElementsByClassName("createSchoolForm")[0]);
  var lowestGradeLvl = newData.get("lowestGradeLevel");
  var highestGradeLvl = newData.get("highestGradeLevel");
  var allGrades = [];
  for (var i = parseInt(lowestGradeLvl); i <= parseInt(highestGradeLvl); i++) {
    console.log(i);
    allGrades.push(i);
  }
  newData.append("grades", JSON.stringify(allGrades));
  const schoolData = new URLSearchParams(newData);
  console.log(schoolData);
  await fetch("/createSchool", {
    method: "POST",
    body: schoolData,
  })
    .then((response) => {
      if (!response.ok) {
        // If not Ok throw an error
        if (response.status === 409) {
          document
            .getElementsByClassName("schoolForm")[1]
            .getElementsByTagName("span")[0].style.display = "block";
        }
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      sessionStorage.setItem("schoolCode", data._id);
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        error.json().then((errorMessage) => {
          console.error(errorMessage.error);
        });
      }
    });
}
async function register() {
  const sessionData = new FormData();
  sessionData.append("email", sessionStorage.getItem("email"));
  sessionData.append("name", sessionStorage.getItem("name"));
  sessionData.append("password", sessionStorage.getItem("password"));
  sessionData.append("schoolCode", sessionStorage.getItem("schoolCode"));
  const userData = new URLSearchParams(sessionData);
  await fetch("/register", {
    method: "POST",
    body: userData,
  })
    .then((response) => {
      if (!response.ok) {
        // If not Ok throw an error
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem("id", data._id);
      var url = "/addStaff/" + data._id + "/" + data.schoolCode;
      return fetch(url, {
        method: "POST",
      });
    })
    .then((response) => {
      if (!response.ok) {
        // If not Ok throw an error
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        error.json().then((errorMessage) => {
          console.error(errorMessage.error);
        });
      }
    });
}
async function useSchoolCodeAndRegister(event) {
  event.preventDefault(); 
   // Convert form data to object 
  const formData = new FormData(document.getElementsByClassName("addCodeForm")[0]);
  const data = Object.fromEntries(formData.entries());
  console.log(data)
  // Store data in session storage
  sessionStorage.setItem("schoolCode", data.schoolCode) 
  console.log(sessionStorage.getItem("schoolCode")) 
  await register(); 
}
async function createSchoolAndRegister(event) {
  event.preventDefault();
  await createSchool();
  await register();
  await changeUserPermissions("admin");
}
async function changeUserPermissions(status = "member") {
  var url = "/updateUserWthChanges/" + sessionStorage.getItem("id");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessPermissions: status }),
  })
    .then((response) => {
      if (!response.ok) {
        // If not Ok throw an error
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      sessionStorage.clear();
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        error.json().then((errorMessage) => {
          console.error(errorMessage.error);
        });
      }
    });
}
//call setUpUser function to be called when the form is submitted
handleEvents(document.getElementsByClassName("signup-form")[0], "submit", setUpUser);
//call createSchoolAndRegister function when called
handleEvents(
  document.getElementsByClassName("createSchoolForm")[0],
  "submit",
  createSchoolAndRegister
);
handleEvents(document.getElementsByClassName("addCodeForm")[0], "submit", useSchoolCodeAndRegister);
handleEvents(
  document.querySelector("div.schoolCodePage > div.LoginContainer > button:first-of-type"),
  "click",
  function () {
    document.querySelector("div.schoolCodePage > div.LoginContainer").children[4].style.display =
      "block";
    for (var i = 0; i < 4; i++) {
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
  }, 750);
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
