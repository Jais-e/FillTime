'use strict';
// Global variables
const cities = ["Aarhus", "Copenhagen", "Odense", "Aalborg"];
const categories = ["All", "Movies", "Museums", "Parks", "Music", "Active"];
const time = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
let dropDown = '<option value="">-- Choose city --</option>';
let dropDown2 = '<option value="">-- Choose activity --</option>';
let dropDown3 = '<option value="">-- Start at --</option>';
let dropDown4 = '<option value="">-- End at --</option>';
let localStorageWasHere;


// Web storage
document.querySelector("#remember-me").onclick = function(){
 let rememberMe = true;
  console.log(rememberMe);
  // store value in local storage
  localStorage.setItem("boolean", rememberMe);
  // call loadFromStorage to update displayed values
  loadFromStorage();
document.querySelector(".first-time-here").style.display = "none";
};
function loadFromStorage() {
  // get data from local storage
  localStorageWasHere = localStorage.getItem("boolean");
  console.log("localStorageWasHere", localStorageWasHere);
}
loadFromStorage();

// What to be displayed when clicking "Get started" button
document.querySelector('#get-started').onclick = function() {
// Display the "first time here pop-up" - if first time here...
  if (localStorageWasHere == "true"){
    document.querySelector(".first-time-here").style.display = "none";
  }
    else{
      document.querySelector(".first-time-here").style.display = "block";
  };
  // Display all else
  document.querySelector('#get-started').style.opacity = "0.5";
  document.querySelector("#city-choice").style.display = "block";
  document.querySelector("#marker").style.display = "block";
  document.querySelector(".animation").style.display = "none";
  document.querySelector(".logo").classList.add("visible");
  document.querySelector(".burger").classList.add("visible");
  document.querySelector("#headline-top").innerHTML = "City:";
  document.querySelector("#headline-position1").innerHTML = "Or...";
  document.querySelector("#headline-position2").innerHTML = "Use location";
  document.querySelector('#get-started').disabled = true;

  // Show message that location is not working yet - if icon is clicked
  document.querySelector("#marker").onclick = function() {
    document.querySelector(".error-modal").style.display = "block";
    document.querySelector("#error-msg").innerHTML = "<h4>Sorry - This functionality is not yet available<br>Please choose from dropdown menu</h4><br><button id='ok-btn'>Ok!</button>";
    document.querySelector("#ok-btn").onclick = function() {
      document.querySelector(".error-modal").style.display = "none";
    };
  };

  // Populate dropdown menu with "cities" when clicking "Get started" button
  for (let city of cities) {
    dropDown += `
  <option class="select-item" value=${city}> ${city} </option>
`

  }
  // Add "cities" to DOM
  document.querySelector("#city-choice").innerHTML += dropDown;
};

// When city selected... only Aarhus works
document.querySelector("#city-choice").onchange = function() {
  if (this[this.selectedIndex].value === "Aarhus") {
    // Display elements "block"
    let elementsOn = document.querySelectorAll("#start-time, #end-time, #category-choice, #next, .city-img");
    let iOn;
    for (iOn = 0; iOn < elementsOn.length; iOn++) {
      elementsOn[iOn].style.display = "block";
    };
    // Display elements "none"
    let elementsOff = document.querySelectorAll("#city-choice, #get-started, #marker, #headline-position1, #headline-position2");
    let iOff;
    for (iOff = 0; iOff < elementsOff.length; iOff++) {
      elementsOff[iOff].style.display = "none";
    };
    // Set headlines and city image
    document.querySelector("#headline-top").innerHTML = "Timeframe:";
    document.querySelector("#headline-category").innerHTML = "Activity:";
    document.querySelector(".city-img").innerHTML += "<img src='img/aarhus.png'>";
    // Populate dropdown menu with "categories"
    for (let cat of categories) {
      dropDown2 += `
    <option class="select-item" value=${cat}> ${cat} </option>
  `

    }
    // Add "categories" to DOM
    document.querySelector("#category-choice").innerHTML += dropDown2;
    // Populate dropdown3 menu with "time"
    for (let hour of time) {
      dropDown3 += `
    <option class="select-item" value=${hour}> ${hour + ".00"} </option>
    `

    }
    // Populate dropdown4 menu with "time"
    for (let hour of time) {
      dropDown4 += `
  <option class="select-item" value=${hour}> ${hour + ".00"} </option>
  `

    }
    // Add "time" to DOM
    document.querySelector("#start-time").innerHTML += dropDown3;
    document.querySelector("#end-time").innerHTML += dropDown4;
    // If not Aarhus is chosen - Only Aarhus is available
  } else {
    document.querySelector(".error-modal").style.display = "block";
    document.querySelector("#error-msg").innerHTML = "<h4>Currently only Aarhus is available</h4><br><button id='ok-btn'>Ok!</button>";
    document.querySelector("#ok-btn").onclick = function() {
      document.querySelector(".error-modal").style.display = "none";
      document.querySelector("#city-choice").selectedIndex = dropDown[1];
    };
  }
  // Start time selection
  document.querySelector("#start-time").onchange = function() {
    startTimeframe = this[this.selectedIndex].value;
    console.log(startTimeframe);
  };
  // End time selection
  document.querySelector("#end-time").onchange = function() {
    endTimeframe = this[this.selectedIndex].value;
    console.log(endTimeframe);
    // Validating input - Start can't be later than end
    if (endTimeframe <= startTimeframe) {
      document.querySelector(".error-modal").style.display = "block";
      document.querySelector("#error-msg").innerHTML = "<h3>Please make sure that end time is later than start time ;-)</h3><br><button id='ok-btn'>Ok!</button>";
      document.querySelector("#ok-btn").onclick = function() {
        document.querySelector("#end-time").selectedIndex = dropDown4[0];
        document.querySelector(".error-modal").style.display = "none";
      };
    }
    // Calculate available time
    else {
      availableTime = endTimeframe - startTimeframe;
    }
    console.log("Time available " + availableTime + " hour(s)");
  };
  // Category selection
  document.querySelector("#category-choice").onchange = function() {
    chosenCategory = this[this.selectedIndex].value;
    console.log(chosenCategory);
  };
};
/*
// Filter activities available within timeframe
function activityAvailable(activities, startTime, endTime, maxDuration){

  if ()
};
*/

document.querySelector("#next").onclick = function() {
  if (startTimeframe >= 10 && endTimeframe >= 11 && chosenCategory != "-- Choose activity --") {
    let elements = document.querySelectorAll("#headline-position1, #headline-position2, #headline-category, #category-choice, #start-time, #end-time, .city-img, #next ");
    let i;
    for (i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    };

    document.querySelector(".results").style.display = "block";
    document.querySelector("#back").style.display = "block";
    document.querySelector("#headline-top").innerHTML = "Your options:";
    getMovies();
  } else {
    document.querySelector(".error-modal").style.display = "block";
    document.querySelector("#error-msg").innerHTML = "<h3>Make sure that you have chosen both timeframe & category</h3><br><button id='ok-btn'>Ok!</button>";
    document.querySelector("#ok-btn").onclick = function() {
      document.querySelector("#end-time").selectedIndex = dropDown4[0];
      document.querySelector(".error-modal").style.display = "none";
    }
  }
};
document.querySelector("#back").onclick = function() {
  location.reload();
}
// Convert minutes into hours and minutes
// Code found here: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php
function timeConvert(n) {
  let num = n;
  let hours = (num / 60);
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return rhours + " h " + rminutes + " m";
};


// Get movies-category from Wordpress API
function getMovies() {
  fetch('http://webapp.jais-e.dk/wp-json/wp/v2/posts?_embed&categories=5')
    .then(function(response) {
      return response.json();
    })
    .then(function(movies) {
      appendMovies(movies);
    });
};
let activityTime; // Duration OR recommended time to spend - per category
let allActivitiesTime; // Duration OR recommended time to spend - all categories
let exhibitStart; // Museum opens
let exhibitEnd; // Museum closes
let movieStart; // Movie begins
let movieEnd; // Movie ends
let activeStart; // Activity location opens
let activeEnd; // Activity location closes
let startTimeframe; // User timeframe start
let endTimeframe; // User timeframe ends
let availableTime;
let actualEndTime;
let chosenCategory;

// Appends movies-category json data to the DOM
function appendMovies(movies) {
  let movieTemplate = "";

  for (let movie of movies) {
    activityTime = Number(movie.acf.duration);
    movieStart = Number(movie.acf.start);
    actualEndTime = Number(movie.acf.start) + Number(activityTime/60);
    startTimeframe = Number(startTimeframe);
    endTimeframe = Number(endTimeframe);
    availableTime = Number(availableTime);
    console.log(movie.title.rendered + " starts at " + movieStart + ".00");
    console.log("start timeframe " + startTimeframe);
    console.log("available time " + availableTime);
    console.log("movie duration " + timeConvert(activityTime));
    console.log("actual end time " + actualEndTime);
    console.log("end timeframe " + endTimeframe);

    if (activityTime/60 <= availableTime && startTimeframe <= movieStart && actualEndTime <= endTimeframe){
      console.log(movie.acf.title + " is available");
    movieTemplate += `
        <section class="result-item">
          <picture class="result-img">
            <img src="${movie.acf.featured}" alt="movie poster">
          </picture>
          <div class="movie-info">
            <h4>${movie.title.rendered}</h4>
            <p>Genre: ${movie.acf.genre}</p>
            <p>Description: ${movie.content.rendered}</p>
            <p><B>Begins:</B> ${movieStart + ".00"} </p>
            <p><B>Duration:</B> ${timeConvert(activityTime)}</p>
          </div>
          </section>
        `;
        }
        else {

        }
  };

  document.querySelector(".results").innerHTML += movieTemplate;
};

// Get exhibition-category from Wordpress API
function getExhibitions() {
  fetch('http://webapp.jais-e.dk/wp-json/wp/v2/posts?_embed&categories=6')
    .then(function(response) {
      return response.json();
    })

    .then(function(exhibition) {
      appendMovies(exhibition);
    });
  exhibitStart = exhibition.acf.opens;
  activityTime = exhibition.acf.recommended;
};

// Appends exhibitions-category json data to the DOM
function appendExhibitions(exhibitions) {
  let exhibitionTemplate = "";
  for (let exhibition of exhibitions) {
    console.log(exhibition);
    movieTemplate += `
          <section class="result-img">
            <img class="movie-img" src="${exhibition.acf.featured}" alt="movie poster">
          </section>
          <section class="result-info">
            <h4>${exhibition.title.rendered}</h4>
            <p>Genre: ${exhibition.acf.genre}</p>
            <p>Description: ${exhibition.content.rendered}</p>
            <p>Opens: ${exhibitStart} </p>
            <p>Closes: ${exhibitEnd} </p>
            <p>Duration: ${timeConvert(activityTime)}</p>
          </section>
        `;
  };

  document.querySelector(".results").innerHTML += exhibitionTemplate;
};
