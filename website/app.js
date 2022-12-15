/********** Start Global Variables **********/

// Create a new date instance dynamically with JS
let day = new Date();
let newDate =
  day.getMonth() + 1 + "/" + day.getDate() + "/" + day.getFullYear();

// generate button
const button = document.getElementById("generate");

// results
const dataAddedDiv = document.getElementById("dataAdded");

const dateDiv = document.getElementById("date");
const weatherTempDiv = document.getElementById("temp");
const contentDiv = document.getElementById("content");

// openweathermap weather api

const apiKey = "ad219d3db23f997d12a1576c3ba916cf";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&zip=`;

/********** End Global Variables **********/

/********** Start Main Function **********/

// Use zipCode and feelings inputs on button click to get the weather

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

button.addEventListener("click", (event) => {
  event.preventDefault;

  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  showDataAdded(zipCode, feelings);

  getWeather(zipCode, feelings);
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const showDataAdded = (zipCode, feelings) => {
  dataAddedDiv.innerHTML = `code: ${zipCode} - feel: ${feelings}`;
  dateDiv.innerHTML = `loading...`;
  weatherTempDiv.innerHTML = ``;
  contentDiv.innerHTML = ``;
};

/////////////////////////////////////////////////////////////////////

const getWeather = (zipCode, feelings) => {
  fetch(apiUrl + zipCode).then((res) => {
    res.json().then((data) => {
      const temp = data.main.temp;
      const weather = data.weather[0].main;

      postData("/addData", {
        date: date,
        temp: temp,
        weather: weather,
        feelings: feelings,
      });
    });
  });
};

/////////////////////////////////////////////////////////////////////

const postData = (url, dataToSend) => {
  fetch("/addData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: dataToSend.date,
      temp: dataToSend.temp,
      weather: dataToSend.weather,
      feelings: dataToSend.feelings,
    }),
  }).then(updateUi());
};

/////////////////////////////////////////////////////////////////////

const updateUi = () => {
  fetch("/data").then((res) => {
    res.json().then((data) => {
      dateDiv.innerHTML = `today is: ${newDate}`;
      weatherTempDiv.innerHTML = `current temp in celsius is: ${data.temp}`;
      contentDiv.innerHTML = `the weather is: ${data.weather} and you feel: ${data.feelings}`;
    });
  });
};

/////////////////////////////////////////////////////////////////////

/********** End Main Function **********/
