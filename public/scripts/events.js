import { handleEvents, displayPages } from "./mainFunctions.js";
import * as data from "./handlingData.js";
import * as navigate from "./navigation.js";

//set up handle data interactions
handleEvents(document.getElementsByClassName("signup-form")[0], "submit", data.setUpUser);

//call createSchoolAndRegister function when called
handleEvents(document.getElementsByClassName("createSchoolForm")[0], "submit", data.createSchoolAndRegister);

//call useSchoolCodeAndRegist function when form submitted
handleEvents(document.getElementsByClassName("addCodeForm")[0], "submit", data.useSchoolCodeAndRegister);
//call loginAndDisplayDashboard when form submitted
handleEvents(document.getElementsByClassName("login-form")[0], "submit", data.loginAndDisplayDashboard);
handleEvents(document.getElementById("faculty"), "click", data.displayFaculty);
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
          alert(error.message);
        }
        break;
    }
  });
});
handleEvents(document.getElementById("facultyInput"), "input", data.displayFaculty);

// navigation events
var loginButtons = document.getElementsByClassName("LoginContainer")[0].children;
handleEvents(loginButtons[0], "click", navigate.displayLandingPageForms, "add", [], true);
Array(...document.getElementsByClassName("other-opt")).forEach((element) => {
  handleEvents(element.children[0], "click", navigate.displayLandingPageForms, "add", [], true);
});
handleEvents(loginButtons[1].children[0], "click", navigate.displayLandingPageForms, "add", [], true);

//display schoolCodeForm
handleEvents(document.querySelector("div.schoolCodePage > div.LoginContainer > button:first-of-type"), "click", function () {
  document.querySelector("div.schoolCodePage > div.LoginContainer").children[4].style.display = "block";
  for (var i = 0; i < 4; i++) {
    //display addCodeForm
    displayPages(
      document.querySelector("div.schoolCodePage > div.LoginContainer").children[i],
      document.getElementsByClassName("addCodeForm")[0],
      "flex"
    );
  }
});
//display create school form page
handleEvents(document.querySelector("div.schoolCodePage > div.LoginContainer > button:nth-child(4)"), "click", function () {
  document.querySelector("div.schoolCodePage > div.LoginContainer").children[4].style.display = "block";
  for (var i = 0; i < 4; i++) {
    displayPages(
      document.querySelector("div.schoolCodePage > div.LoginContainer").children[i],
      document.getElementsByClassName("createSchoolForm")[0],
      "flex"
    );
  }
});

//navigation for dashboard tabs and buttons
handleEvents(document.getElementsByClassName("events-tab")[0], "click", function () {
  displayPages(
    document.getElementsByClassName("selectionSection-container")[0],
    document.getElementsByClassName("eventsSection-container")[0],
    "flex"
  );
  document.querySelector(".eventsSection-container > div > .arrow").parentNode.style.display = "flex";
});
handleEvents(document.getElementsByClassName("rewards-tab")[0], "click", function () {
  displayPages(
    document.getElementsByClassName("selectionSection-container")[0],
    document.getElementsByClassName("rewardsSection-container")[0]
  );
  document.querySelector(".rewardsSection-container > div > .arrow").parentNode.style.display = "flex";
});
handleEvents(document.getElementsByClassName("students-tab")[0], "click", function () {
  displayPages(
    document.getElementsByClassName("selectionSection-container")[0],
    document.getElementsByClassName("studentsSection-container")[0],
    "flex"
  );
  document.querySelector(".studentsSection-container > div > .arrow").parentNode.style.display = "flex";
});
handleEvents(document.getElementById("faculty"), "click", function () {
  Array(...document.getElementsByClassName("main-container")).forEach((element) => {
    displayPages(element, document.getElementsByClassName("facultySection-container")[0], "flex");
  });
});
handleEvents(document.getElementById("studentFilter"), "click", navigate.displayFilters, "add", ["#studentFilter"]);
handleEvents(document.getElementById("newStudentForm"), "click", navigate.displayAddDataForms, "add", ["#newStudentForm"])