import { displayPages } from './mainFunctions.js';
//Everything regarding DOM manipulation
// Declare empty objects for user and school data

//Fetching routes(involves sending & getting data)
// This function is called when the user submits the signup form, prepares user data for sign up function later
//call setUpUser function to be called when the form is submitted
export async function setUpUser(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  //display arrow at School Form Page Intro
  document.getElementsByClassName('arrow')[1].parentNode.style.display = 'flex';
  try {
    // Get the form data
    const formdata = new URLSearchParams(new FormData(document.getElementsByClassName('form_signup')[0]));
    // Send the form data to the server
    const response = await fetch('/setup-user', {
      method: 'POST',
      body: formdata,
    });
    // Check if the response is not OK
    if (!response.ok) {
      // If the response status is 409 (Conflict), display an error message
      if (response.status === 409) {
        document.getElementsByClassName('form_signup')[0].getElementsByTagName('span')[0].style.display = 'block';
      }
      // Throw an error
      const error = await response.json();
      throw new Error(error.error);
    } else {
      // If the response is OK, log the response and return the JSON data
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      // Process the JSON data returned from the server
      displayPages(document.getElementsByClassName('page_home')[0], document.getElementsByClassName('schoolInfo_container')[0]);
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('name', data.name);
      sessionStorage.setItem('password', data.password);
    }
  } catch (error) {
    // Log the error
    if (error.message !== 'Account Seems To Have Already Been Made') {
      console.error(error.message);
    }
  }
}
//Create School
async function createSchool() {
  try {
    var newData = new FormData(document.getElementsByClassName('form_createSchool')[0]);
    var lowestGradeLvl = newData.get('lowestGradeLevel');
    var highestGradeLvl = newData.get('highestGradeLevel');
    var allGrades = [];
    for (var i = parseInt(lowestGradeLvl); i <= parseInt(highestGradeLvl); i++) {
      allGrades.push(i);
    }
    newData.append('grades', JSON.stringify(allGrades));
    const schoolData = new URLSearchParams(newData);
    const response = await fetch('/createSchool', {
      method: 'POST',
      body: schoolData,
    });
    if (!response.ok) {
      if (response.status === 409) {
        document.getElementsByClassName('schoolInfo_form')[1].getElementsByTagName('span')[0].style.display = 'block';
      }
      const error = await response.json();
      throw new Error(error.error);
    } else {
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      sessionStorage.setItem('schoolCode', data._id);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
//Sign Up User
async function register() {
  try {
    const sessionData = new FormData();
    sessionData.append('email', sessionStorage.getItem('email'));
    sessionData.append('name', sessionStorage.getItem('name'));
    sessionData.append('password', sessionStorage.getItem('password'));
    sessionData.append('schoolCode', sessionStorage.getItem('schoolCode'));
    const userData = new URLSearchParams(sessionData);
    const response = await fetch('/register', {
      method: 'POST',
      body: userData,
    });
    if (!response.ok) {
      // If not Ok throw an error
      if (response.status === 404) {
        document.querySelector('form_addCode > span').style.display = 'block';
      }
      const error = await response.json();
      throw new Error(error.error);
    } else {
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      sessionStorage.setItem('id', data._id);
      var url = '/handleFacultyRoleInSchool/' + data._id + '/' + data.schoolCode;
      const response2 = await fetch(url, {
        method: 'POST',
      });
      if (!response.ok) {
        // If not Ok throw an error
        const error = await response.json();
        throw new Error(error.error);
      } else {
        //display notice for user
        const user = await response2.json();
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('after-register-notice').setAttribute('toggled', true);
        return user;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
async function login() {
  try {
    const formData = new FormData(document.getElementsByClassName('form_login')[0]);
    const dataForFetch = new URLSearchParams(formData);
    const response = await fetch('/login', {
      method: 'POST',
      body: dataForFetch,
    });
    if (!response.ok) {
      const error = await response.json();
      if (error.error === 'Username or Password is wrong') {
        document.querySelector('.form_login > span').style.display = 'block';
      }
      throw new Error(error.error);
    } else {
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
      localStorage.setItem('LoginStatus', 'true');
    }
  } catch (error) {
    throw new Error(error.message);
  }
} 
export async function deleteUser(event) {  
   event.preventDefault();
  try { 
  } catch (error) {
    
  }
} 
export async function deleteStudent(event) {  
  event.preventDefault();
  try {
    
  } catch (error) {
    
  }
}
async function getData(fetchUrl, inputElement, sortType) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const searchInputs = {
    name: inputElement.value.toLowerCase().trim(),
    email: inputElement.value.toLowerCase().trim(),
    sortType: sortType,
  };
  try {
    //this is actually a req.post as we have actually inputing values from the search
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
      },
      body: JSON.stringify(searchInputs),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    } else {
      if (response.headers.get('refresh-token')) {
        localStorage.setItem('accessToken', JSON.stringify(response.headers.get('access-token')));
        localStorage.setItem('refreshToken', JSON.stringify(response.headers.get('refresh-token')));
      }
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      return data;
    }
  } catch (error) {
    if (
      error.message === 'jwt expired' ||
      error.message === 'Invalid refresh token' ||
      error.message === 'Token or Refresh Token not found'
    ) {
      document.getElementById('overlay').style.display = 'block';
      document.getElementById('invalidAuthorization').setAttribute('toggled', true);
    } else {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
async function getFaculty(inputElement) {
  try {
    const data = await getData('/getFaculty', inputElement, '');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getStudents(inputElement) {
  try {
    const studentSortType = document.getElementById('gradeInput').checked ? 'Grade' : 'Points';
    const data = await getData('/getStudents', inputElement, studentSortType);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
async function getEvents(inputElement) {
  try {
    const eventSortType =
      document.querySelector('input[name="sortType"]:checked').value === 'Sporting'
        ? 'Sporting'
        : document.querySelector('input[name="sortType"]:checked').value === 'Non-Sporting'
        ? 'Non-Sporting'
        : 'Points';  
        console.log(eventSortType)
    const data = await getData('/getEvents', inputElement, eventSortType);  
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
export async function createAStudent(event) {
  event.preventDefault();
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const form = document.querySelector('#manualCreateStudent');
  const formData = new FormData(form);
  try {
    const response = await fetch('/createStudent', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
      },
      body: new URLSearchParams(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    } else {
      if (response.headers.get('refresh-token')) {
        localStorage.setItem('accessToken', JSON.stringify(response.headers.get('access-token')));
        localStorage.setItem('refreshToken', JSON.stringify(response.headers.get('refresh-token')));
      }
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      await displayStudents(event);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
} 
export async function createAnEvent (event) {  
  event.preventDefault();
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const form = document.querySelector('#createEventForm');
  const formData = new FormData(form);
  try {
    const response = await fetch('/createEvent', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
      },
      body: new URLSearchParams(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    } else {
      if (response.headers.get('refresh-token')) {
        localStorage.setItem('accessToken', JSON.stringify(response.headers.get('access-token')));
        localStorage.setItem('refreshToken', JSON.stringify(response.headers.get('refresh-token')));
      }
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      await displayEvents(event);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function kick(event) {
  event.preventDefault();
  try {  
    
  } catch (error) {}
}
export async function uploadStudents(event) {
  event.preventDefault();
  try {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    const fileInput = document.getElementById('studentUpload');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/uploadStudents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
      },
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    } else {
      if (response.headers.get('refresh-token')) {
        localStorage.setItem('accessToken', JSON.stringify(response.headers.get('access-token')));
        localStorage.setItem('refreshToken', JSON.stringify(response.headers.get('refresh-token')));
      }
      const data = await response.json();
      if (data.alertUser === true) {
        alert(data.message);
      }
      await displayStudents(event);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function useSchoolCodeAndRegister(event) {
  event.preventDefault();
  // Convert form data to object
  const formData = new FormData(document.getElementsByClassName('addCodeForm')[0]);
  const data = Object.fromEntries(formData.entries());
  // Store data in session storage
  sessionStorage.setItem('schoolCode', data.schoolCode);
  try {
    await register();
  } catch (error) {
    console.error(error.message);
  }
}

export async function createSchoolAndRegister(event) {
  event.preventDefault();
  try {
    await createSchool();
    await register();
  } catch (error) {
    console.error(error.message);
  }
}
export async function loginAndDisplayDashboard(event) {
  event.preventDefault();
  try {
    await login();
    // Hide the home page and display the dashboard
    displayPages(document.getElementsByClassName('page_home')[0], document.getElementsByClassName('dashboard')[0]);
    Array(...document.getElementsByClassName('dashboard-tab')).forEach((tab) => {
      tab.setAttribute('displayedOnMobile', false);
      tab.setAttribute('toggled', false);
      if (tab === document.getElementById('home')) {
        tab.setAttribute('toggled', true);
      }
    });
    //display sign-out arrow
    document.getElementById('sign-out').style.display = 'flex';
  } catch (error) {
    if (error.message !== 'Username or Password is wrong') {
      console.error(error.message);
    }
  }
}
export async function displayFaculty(event) {
  event.preventDefault();
  try {
    const data = await getFaculty(document.getElementById('facultyInput'));
    const faculty = data.faculty;
    const user = data.user;
    //generate cards
  
      document.getElementById('facultyDisplay').innerHTML = '';
      generateSearchCards(user, document.getElementById('facultyDisplay'), '', 'userCard', '[data-search-template]');
      generateSearchCards(
        faculty,
        document.getElementById('facultyDisplay'),
        user[0].accessPermissions,
        undefined,
        '[data-search-template]'
      );
    
  } catch (error) {
    console.error(error.message);
  }
}
export async function displayStudents(event) {
  event.preventDefault();
  try {
    const data = await getStudents(document.getElementById('getStudentInput'));
    const students = data.student;
    const user = data.user;
    //generate cards
   
      document.getElementById('studentDisplay').innerHTML = '';
      generateSearchCards(
        students,
        document.getElementById('studentDisplay'),
        user.accessPermissions,
        undefined,
        '[data-search-student-template]'
      );

  } catch (error) {
    console.error(error.message);
  }
}
export async function displayEvents(event) {
  event.preventDefault();
  try {
    const data = await getEvents(document.getElementById('getEventsInput'));
    const events = data.event; 
    const user = data.user; 
    //generate cards  
      document.getElementById('eventDisplay').innerHTML = '';
      generateSearchCards(
        events,
        document.getElementById('eventDisplay'),
        user.accessPermissions,
        undefined,
        '[data-search-event-template]'
      );
   
  } catch (error) {
    console.error(error.message);
  }
}
//generate cards 
function generateSearchCards(data, appendElement, role = 'member', addClass = undefined, template) {
  if (!data || data === undefined || data.length === 0) {
    setTimeout(function () {
      if (appendElement.children.length === 0) {
        const newh1 = document.createElement('h1');
        newh1.textContent = 'No Data To Be Displayed';
        appendElement.append(newh1);
      }
    }, 1000);
  }
  data.forEach((element) => {
    const cardTemplate = document.querySelector(template);
    const card = cardTemplate.content.cloneNode(true).children[0];
    if (addClass !== undefined) {
      card.classList.add(addClass);
    }

    if (role === 'admin') {
      card.querySelector('[data-admin-body]').style.display = 'block';
    }
    const title = card.querySelector('[data-title]');
    const body = card.querySelectorAll('[data-body]');
    title.textContent = element.name;
    let incrementExtension = 0;
    for (var i = 0; i < body.length + incrementExtension; i++) {
      const property = Object.keys(element)[i];
      if (property != '_id' && property != 'name') {
        body[i - incrementExtension].textContent = element[property];
      } else {
        incrementExtension++;
      }
    }
    appendElement.append(card);
  });
}
