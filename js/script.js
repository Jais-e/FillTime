'use strict';


// Global variables
const cities = ["Aarhus", "Copenhagen", "Odense", "Aalborg"];
const categories = ["All", "Movies", "Museums", "Parks", "Music", "Active"];
let dropDown = '<option value="">-- Choose city --</option>';
let dropDown2 = '<option value="">-- Choose category --</option>';
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


// Populate dropdown menu with "cities" when clicking "next" button
document.querySelector('#get-started').onclick = function() {
  document.querySelector("#city-choice").style.display = "block";

  for (let city of cities) {
    dropDown += `
  <option class="select-item" value=${city}> ${city} </option>
`
    console.log(city);
  }
  // Add "cities" to DOM
  document.querySelector(".selector").innerHTML += dropDown;

};

// When city selected... Only Aarhus is available
document.querySelector("#city-choice").onchange = function() {
  if (this[this.selectedIndex].value === "Aarhus") {
    document.querySelector(".content").innerHTML = "You have chosen Aarhus";
  } else {
    document.querySelector(".content").innerHTML = "This city is currently not available";
  }
};


// Populate dropdown menu with "categories" when clicking "next" button
document.querySelector('#next') = function() {
  for (let cat of categories) {
    dropDown2 += `
  <option class="select-item" value=${cat}> ${cat} </option>
`
    console.log(categories);
  }
  // Add "categories" to DOM
  document.querySelector(".selector").innerHTML += dropDown2;
}

/*
// Filter activities available within timframe
function activityAvailable(activities, startTime, endTime, maxDuration){
  let maxDuration = endTime - startTime;
  if ()
};
*/


// Convert minutes into hours and minutes
function timeConvert(n) {
  let num = n;
  let hours = (num / 60);
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return rhours + " h and " + rminutes + " m";
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
  movieStart = movies.acf.start;
  movieEnd = movies.acf.end;
  activityTime = movies.acf.duration;
};


// Appends movies-category json data to the DOM
function appendMovies(movies) {
  let movieTemplate = "";
  for (let movie of movies) {
    console.log(movie);
    movieTemplate += `
          <section class="result-img">
            <img class="movie-img" src="${movie.acf.featured}" alt="movie poster">
          </section>
          <section class="result-info">
            <h4>${movie.title.rendered}</h4>
            <p>Genre: ${movie.acf.genre}</p>
            <p>Description: ${movie.content.rendered}</p>
            <p>Begins: ${movieStart} </p>
            <p>Duration: ${timeConvert(activityTime)}</p>
          </section>
        `;
  };

  document.querySelector(".content").innerHTML += movieTemplate;
};

// Get exhibition-category from Wordpress API
function getMuseums() {
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

  document.querySelector(".content").innerHTML += exhibitionTemplate;
};
