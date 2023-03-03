import { handleEvents, displayPages } from "./mainFunctions.js";
//Everything regarding DOM manipulation
// Declare empty objects for user and school data
let user = {};
let school = {};

//Fetching routes(involves sending & getting data)
// This function is called when the user submits the signup form, prepares user data for sign up function later

async function setUpUser(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  //display arrow at School Form Page Intro
  document.getElementsByClassName("arrow")[1].parentNode.style.display = "block";
  try {
    // Get the form data
    const formdata = new URLSearchParams(
      new FormData(document.getElementsByClassName("signup-form")[0])
    );
    // Send the form data to the server
    const response = await fetch("/setup-user", {
      method: "POST",
      body: formdata,
    });
    // Check if the response is not OK
    if (!response.ok) {
      // If the response status is 409 (Conflict), display an error message
      if (response.status === 409) {
        document
          .getElementsByClassName("signup-form")[0]
          .getElementsByTagName("span")[0].style.display = "block";
      }
      // Throw an error
      const error = await response.json();
      throw new Error(error.error);
    } else {
      // If the response is OK, log the response and return the JSON data
      const data = await response.json();
      // Process the JSON data returned from the server
      displayPages(
        document.getElementsByClassName("homePage")[0],
        document.getElementsByClassName("schoolCodePage")[0]
      );
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("password", data.password);
    }
  } catch (error) {
    // Log the error
    console.error(error);
  }
}
//Create School
async function createSchool() {
  try {
    var newData = new FormData(document.getElementsByClassName("createSchoolForm")[0]);
    var lowestGradeLvl = newData.get("lowestGradeLevel");
    var highestGradeLvl = newData.get("highestGradeLevel");
    var allGrades = [];
    for (var i = parseInt(lowestGradeLvl); i <= parseInt(highestGradeLvl); i++) {
      allGrades.push(i);
    }
    newData.append("grades", JSON.stringify(allGrades));
    const schoolData = new URLSearchParams(newData);
    const response = await fetch("/createSchool", {
      method: "POST",
      body: schoolData,
    });
    if (!response.ok) {
      if (response.status === 409) {
        document
          .getElementsByClassName("schoolForm")[1]
          .getElementsByTagName("span")[0].style.display = "block";
      }
      const error = await response.json();
      throw new Error(error.error);
    } else {
      const data = await response.json();
      sessionStorage.setItem("schoolCode", data._id);
    }
  } catch (error) {
    throw new Error(error);
  }
}
//Sign Up User
async function register() {
  try {
    const sessionData = new FormData();
    sessionData.append("email", sessionStorage.getItem("email"));
    sessionData.append("name", sessionStorage.getItem("name"));
    sessionData.append("password", sessionStorage.getItem("password"));
    sessionData.append("schoolCode", sessionStorage.getItem("schoolCode"));
    const userData = new URLSearchParams(sessionData);
    const response = await fetch("/register", {
      method: "POST",
      body: userData,
    });
    if (!response.ok) {
      // If not Ok throw an error
      if (response.status === 404) {
        document.querySelector(".addCodeForm > span").style.display = "block";
      }
      const error = await response.json();
      throw new Error(error.error);
    } else {
      const data = await response.json();
      sessionStorage.setItem("id", data._id);
      var url = "/handleFacultyRoleInSchool/" + data._id + "/" + data.schoolCode;
      const response2 = await fetch(url, {
        method: "POST",
      });
      if (!response.ok) {
        // If not Ok throw an error
        const error = await response.json();
        throw new Error(error.error);
      } else {
        //display notice for user
        const user = await response2.json();
        document.getElementById("overlay").style.display = "block";
        document.getElementById("after-register-notice").style.display = "flex";
        return user;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function login() {
  try {
    const formData = new FormData(document.getElementsByClassName("login-form")[0]);
    const dataForFetch = new URLSearchParams(formData);
    const response = await fetch("/login", {
      method: "POST",
      body: dataForFetch,
    });
    if (!response.ok) {
      const error = await response.json();
      if (error.error === "Username or Password is wrong") {
        document.querySelector(".login-form > span").style.display = "block";
      }
      throw new Error(error.error);
    } else {
      const data = await response.json();
      localStorage.setItem("UserId", data);
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function useSchoolCodeAndRegister(event) {
  event.preventDefault();
  // Convert form data to object
  const formData = new FormData(document.getElementsByClassName("addCodeForm")[0]);
  const data = Object.fromEntries(formData.entries());
  // Store data in session storage
  sessionStorage.setItem("schoolCode", data.schoolCode);
  try {
    await register();
  } catch (error) {
    console.error(error);
  }
}

async function createSchoolAndRegister(event) {
  event.preventDefault();
  try {
    await createSchool();
    await register();
  } catch (error) {
    console.error(error);
  }
}
async function loginAndDisplayDashboard(event) {
  event.preventDefault();
  try {
    await login();
    // Hide the home page and display the dashboard
    displayPages(
      document.getElementsByClassName("homePage")[0],
      document.getElementsByClassName("dashboard")[0]
    );  
    //display sign-out arrow
    document.getElementById("sign-out").style.display = "block";
  } catch (error) {
    console.error(error);
  }
}
//call setUpUser function to be called when the form is submitted
handleEvents(document.getElementsByClassName("signup-form")[0], "submit", setUpUser);

//call createSchoolAndRegister function when called
handleEvents(
  document.getElementsByClassName("createSchoolForm")[0],
  "submit",
  createSchoolAndRegister
);

//call useSchoolCodeAndRegist function when form submitted
handleEvents(document.getElementsByClassName("addCodeForm")[0], "submit", useSchoolCodeAndRegister);
//call loginAndDisplayDashboard when form submitted
handleEvents(document.getElementsByClassName("login-form")[0], "submit", loginAndDisplayDashboard);

var overlayButtons = document.getElementsByClassName("overlay-buttons");
Array(...overlayButtons).forEach((button) => {
  handleEvents(button, "click", async function () {
    document.getElementById("overlay").style.display = "none";
    Array(...document.querySelectorAll("#overlay > *")).forEach((parent) => {
      parent.style.display = "none";
    });
    switch (Array(...overlayButtons).indexOf(button)) {
      case 0:
        try {
          window.event.preventDefault();
          const sessionData = new FormData();
          sessionData.append("email", sessionStorage.getItem("email"));
          sessionData.append("id", sessionStorage.getItem("id"));
          const userData = new URLSearchParams(sessionData);
          const response = await fetch("/sendVerifyEmail", {
            method: "POST",
            body: userData,
          });
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
          } else { 
            window.location.reload();
          }
        } catch (error) {
          console.error(error);
        }
        break;
    }
  });
});
