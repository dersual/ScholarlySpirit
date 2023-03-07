import { handleEvents, displayPages } from './mainFunctions.js';
//Check if page status is logged in localStorage
if (JSON.parse(localStorage.getItem('LoginStatus'))) {
  setTimeout(function () {
    displayPages(document.getElementsByClassName('homePage')[0], document.getElementsByClassName('dashboard')[0]);
    //display sign-out arrow
    document.getElementById('sign-out').style.display = 'flex';
  }, 750);
}
// DOM for when logging in and sign up
// Get login buttons and attach event listeners
var loginButtons = document.getElementsByClassName('LoginContainer')[0].children;

export function displayLandingPageForms(el) {
  // Get the login and signup forms from the DOM
  var loginForm = document.getElementsByClassName('login-form')[0];
  var signupForm = document.getElementsByClassName('signup-form')[0];

  // Hide the title after forms appear on mobile screens
  document.getElementsByClassName('homePage')[0].children[0].setAttribute('displayedOnMobile', false);

  // Show the appropriate login/signup button
  loginButtons[2].style.display = 'flex';
  loginButtons[0].style.display = 'none';
  loginButtons[1].style.display = 'none';

  // Adjust the border radius of the button container
  loginButtons[0].parentElement.style.borderRadius = '50px';

  // If the login button was clicked, show the login form and fade it in
  if (el === loginButtons[0] || el === document.getElementsByClassName('login-opt')[0].children[0]) {
    displayPages(signupForm, loginForm);
  }
  // If the signup button was clicked, show the signup form and fade it in
  else if (el === loginButtons[1].children[0] || el === document.getElementsByClassName('signup-opt')[0].children[0]) {
    signupForm.getElementsByTagName('span')[0].style.display = 'none';
    Array(...signupForm.getElementsByTagName('input')).forEach((input) => {
      input.value = '';
    });
    displayPages(loginForm, signupForm);
  }
}
// get all elements with the class 'arrow' from the DOM
var arrow = document.getElementsByClassName('arrow');
// loop through each 'arrow' element and assign events to its parent node
Array(...arrow).forEach((element) => {
  // get the parent node of the 'arrow' element
  var parent = element.parentNode;
  // set the parent node's position and display properties
  parent.style.marginBottom = element.dataset.yPos;
  parent.style.marginTop = '10px';
  parent.style.marginLeft = '5%';
  parent.style.left = element.dataset.xPos;
  //parent.style.width = "clamp(75px, 26%, 80px)";
  parent.style.overflowX = 'visible';
  parent.style.zIndex = 2;
  parent.style.display = 'none';
  parent.style.cursor = 'pointer';
  parent.style.textAlign = 'left';
  //parent.style.justifyContent = "center";
  parent.style.flexDirection = 'row';
  parent.style.alignItems = 'center';
  // get the list of targets to be closed by clicking on the arrow
  var closedTargets = element.dataset.closeTarget.split(',');
  // get the list of targets to be opened by clicking on the arrow
  var openTargets = element.dataset.openTarget.split(',');
  // get the display types for the open targets
  var displayTypes = element.dataset.displayType.split(',');
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
        'click',
        function (element, specificArrow) {
          switch (Array(...arrow).indexOf(specificArrow)) {
            case 0:
              element.removeAttribute('displayedOnMobile');
              break;
            case 4:
              element.setAttribute('toggled', false);
          }
        },
        'add',
        [document.querySelector(target), element]
      );
    });
  }
  // assign the click event to all open targets and closed targets
  for (var r = 0; r < closedTargets.length; r++) {
    for (var c = 0; c < openTargets.length; c++) {
      handleEvents(parent, 'click', displayPages, 'add', [
        document.querySelector(closedTargets[r]),
        document.querySelector(openTargets[c]),
        displayTypes[c],
      ]);
    }
  }
  // assign the click event to hide the parent node when it is clicked and set data displays content to ""
  handleEvents(parent, 'click', function (el) {
      el.style.display = 'none';
      Array(...document.getElementsByClassName('dataDisplayContainer')).forEach((display) => {
        display.innerHTML = '';
      });
    },'add', [], true
  );
});

//change max & min of numbered inputs based on what they have
var minGradeInput = document.getElementsByClassName('lowestGradeLvlInput')[0];
var maxGradeInput = document.getElementsByClassName('highestGradeLvlInput')[0];
function imposeMinMaxGrades(el) {
  setTimeout(function () {
    minGradeInput.max = parseInt(maxGradeInput.value);
    maxGradeInput.min = parseInt(minGradeInput.value);
    if (minGradeInput.max === NaN) {
      minGradeInput.max = 12;
    }
    if (maxGradeInput.min === NaN) {
      maxGradeInput.min = 1;
    }
    imposeMinMax(el);
  }, 850);
}
//Change their values if their values are beyond max and min
function imposeMinMax(el) {
  if (el.value != '') {
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
Array(...document.getElementsByClassName('sortBy')).forEach((element) => {
  element.setAttribute('toggled', false);
});
Array(...document.getElementsByClassName('newDataForm')).forEach((element) => {
  element.setAttribute('toggled', false);
});
const nextYear = new Date().getFullYear() + 1;

// Get the date input element by its ID
const dateInput = document.getElementById('dateEnding');
// Set the maximum value of the date input to next year
dateInput.max = `${nextYear}-12-31`;
export function displayAddDataForms(parentAddElement) {
  let elementSelector = parentAddElement + 'Container';
  console.log(elementSelector);
  let element = document.querySelector(elementSelector);
  console.log(element);
  if (element.getAttribute('toggled') === 'true') {
    document.getElementById('overlay').style.display = 'none';
    element.setAttribute('toggled', false);
  } else {
    element.setAttribute('toggled', true);
    document.getElementById('overlay').style.display = getComputedStyle(element).display;
    document.querySelector('.newDataFormArrow').style.display = 'block';
  }
}
//parentFilterElement is a string that represents a class, id, element tag, etc.
export function displayFilters(parentFilterElement) {
  let elementSelector = parentFilterElement + '> .sortBy';
  let element = document.querySelector(elementSelector);
  console.log(element.getAttribute('toggled'));
  if (element.getAttribute('toggled') === 'true') {
    element.style.maxHeight = '0px';
    setTimeout(function () {
      element.setAttribute('toggled', false);
    }, 1000);
  } else {
    element.setAttribute('toggled', true);
    setTimeout(function () {
      element.style.maxHeight = '200px';
    }, 100);
  }
}
//set attributes for dashboard-tabs
Array(...document.getElementsByClassName('dashboard-tab')).forEach((tab) => {
  tab.setAttribute('displayedOnMobile', false);
  tab.setAttribute('toggled', false);
  if (tab === document.getElementById('home')) {
    tab.setAttribute('toggled', true);
  }
  handleEvents(tab, 'click', function () {
    Array(...document.getElementsByClassName('dashboard-tab')).forEach((element) => {
      element.setAttribute('toggled', false);
      Array(...document.getElementsByClassName('dataDisplayContainer')).forEach((display) => {
        display.innerHTML = '';
      });
    });
    tab.setAttribute('toggled', true);
  });
});

//set attributes for elements in overlay div
Array(...document.getElementById('overlay').children).forEach((element) => {
  element.setAttribute('toggled', false);
});
handleEvents(document.getElementById('sign-out'), 'click', function () {
  localStorage.clear();
  window.location.reload();
});
handleEvents(document.getElementById('home'), 'click', function () {
  Array(...document.getElementsByClassName('main-container')).forEach((element) => {
    displayPages(element, document.getElementsByClassName('selectionSection-container')[0], 'flex');
  });
  //display sign-out arrow
  document.getElementById('sign-out').style.display = 'flex';
});
