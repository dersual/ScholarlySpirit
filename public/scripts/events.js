import { handleEvents, displayPages } from './mainFunctions.js';
import * as data from './handlingData.js';
import * as navigate from './navigation.js';

//set up handle data interactions
handleEvents(document.getElementsByClassName('form_signup')[0], 'submit', data.setUpUser);

//call createSchoolAndRegister function when called
handleEvents(document.getElementsByClassName('form_createSchool')[0], 'submit', data.createSchoolAndRegister);

//call useSchoolCodeAndRegist function when form submitted
handleEvents(document.getElementsByClassName('form_addCode')[0], 'submit', data.useSchoolCodeAndRegister);
//call loginAndDisplayDashboard when form submitted
handleEvents(document.getElementsByClassName('form_login')[0], 'submit', data.loginAndDisplayDashboard);
//displayFaculty on Faculty Tab click
handleEvents(document.getElementById('faculty'), 'click', data.displayFaculty);
var overlayButtons = document.getElementsByClassName('overlay-buttons');
Array(...overlayButtons).forEach((button) => {
  handleEvents(button, 'click', async function () {
    document.getElementById('overlay').style.display = 'none';
    Array(...document.querySelectorAll('#overlay > *')).forEach((parent) => {
      parent.style.display = 'none';
    });
    switch (Array(...overlayButtons).indexOf(button)) {
      case 0:
        try {
          window.event.preventDefault();
          const sessionData = new FormData();
          sessionData.append('email', sessionStorage.getItem('email'));
          sessionData.append('id', sessionStorage.getItem('id'));
          const userData = new URLSearchParams(sessionData);
          const response = await fetch('/sendVerifyEmail', {
            method: 'POST',
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
      case 1:
        localStorage.clear();
        window.location.reload();
        break;
    }
  });
});
handleEvents(document.getElementById('facultyInput'), 'input', data.displayFaculty);
handleEvents(document.getElementById('getStudentInput'), 'input', data.displayStudents);
handleEvents(document.getElementById('getEventsInput'), 'input', data.displayEvents);
handleEvents(document.getElementsByClassName('students-tab')[0], 'click', data.displayStudents);
handleEvents(document.getElementsByClassName('events-tab')[0], 'click', data.displayEvents);
handleEvents(document.getElementById('manualCreateStudent'), 'submit', data.createAStudent);
handleEvents(document.getElementById('uploadCreateStudent'), 'submit', data.uploadStudents);
handleEvents(document.getElementById('createEventForm'), 'submit', data.createAnEvent);

// navigation events
var loginButtons = document.getElementsByClassName('home_form_container')[0].children;
handleEvents(loginButtons[0], 'click', navigate.displayLandingPageForms, 'add', [], true);
Array(...document.getElementsByClassName('other-opt')).forEach((element) => {
  handleEvents(element.children[0], 'click', navigate.displayLandingPageForms, 'add', [], true);
});
handleEvents(loginButtons[1].children[0], 'click', navigate.displayLandingPageForms, 'add', [], true);

//display schoolCodeForm
handleEvents(document.querySelector('#button_toAddCodeForm'), 'click', function () {
  document.querySelector('.schoolInfo_form_container > header').style.display = 'none';
  displayPages(
    document.querySelector('.schoolInfo_form_container > main'),
    document.getElementsByClassName('form_addCode')[0],
    'flex'
  );
});
//display create school form page
handleEvents(document.querySelector('#button_toCreateSchoolForm'), 'click', function () {
  document.querySelector('.schoolInfo_form_container > header').style.display = 'none';
  displayPages(
    document.querySelector('.schoolInfo_form_container > main'),
    document.getElementsByClassName('form_createSchool')[0],
    'flex'
  );
});

//navigation for dashboard tabs and buttons
handleEvents(document.getElementsByClassName('events-tab')[0], 'click', function () {
  displayPages(
    document.getElementsByClassName('selectionSection-container')[0],
    document.getElementsByClassName('eventsSection-container')[0],
    'flex'
  );
  document.querySelector('.eventsSection-container > div > .arrow').parentNode.style.display = 'flex';
});
handleEvents(document.getElementsByClassName('rewards-tab')[0], 'click', function () {
  displayPages(
    document.getElementsByClassName('selectionSection-container')[0],
    document.getElementsByClassName('rewardsSection-container')[0]
  );
  document.querySelector('.rewardsSection-container > div > .arrow').parentNode.style.display = 'flex';
});
handleEvents(document.getElementsByClassName('students-tab')[0], 'click', function () {
  displayPages(
    document.getElementsByClassName('selectionSection-container')[0],
    document.getElementsByClassName('studentsSection-container')[0],
    'flex'
  );
  document.querySelector('.studentsSection-container > div > .arrow').parentNode.style.display = 'flex';
});
handleEvents(document.getElementById('faculty'), 'click', function () {
  Array(...document.getElementsByClassName('main-container')).forEach((element) => {
    displayPages(element, document.getElementsByClassName('facultySection-container')[0], 'flex');
  });
});
handleEvents(document.getElementById('studentFilter'), 'click', navigate.displayFilters, 'add', ['#studentFilter']);
handleEvents(document.getElementById('newStudentForm'), 'click', navigate.displayAddDataForms, 'add', ['#newStudentForm']);
handleEvents(document.getElementById('eventFilter'), 'click', navigate.displayFilters, 'add', ['#eventFilter']);
handleEvents(document.getElementById('newEventForm'), 'click', navigate.displayAddDataForms, 'add', ['#newEventForm']);
const nameSelection = document.querySelectorAll('.nameSelection');
handleEvents(nameSelection[0], 'change', function () {
  const customNameInput = document.getElementById('customName');
  if (nameSelection[0].value === 'Custom' || nameSelection[1].value === 'Custom') {
    customNameInput.style.display = 'block';
  } else {
    customNameInput.style.display = 'none';
  }
});
handleEvents(document.getElementById('customName'), 'input', function () {
  Array(...document.getElementsByClassName('nameSelection')).forEach((element) => {
    element.value = document.getElementById('customName').value;
  });
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
