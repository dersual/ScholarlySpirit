// Overall function to handle event listeners
// element: HTML element or elements
// event: Interactive event that runs function
// funct: The function being run
// type: Default is add, but if anything else remove event listener
// params: Array of parameters to pass to funct
// usingThis: Boolean that indicates if 'this' should be passed to funct
export function handleEvents(
  element,
  event,
  funct,
  type = "add",
  params = [],
  usingThis = false
) {
  var newFunct = null;

  // Check if params array is empty
  if (params.length === 0) {
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
    if (type === "add") {
      element.addEventListener(event, newFunct);
    } else {
      element.removeEventListener(event, newFunct);
    }
  } else {
    // Otherwise, add or remove the event listener using the original function
    if (type === "add") {
      element.addEventListener(event, funct);
    } else {
      element.removeEventListener(event, funct);
    }
  }
}

// function to display pages with a fade-in effect
export function displayPages(prevPage, newPage, displayOpt = "block") {
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
