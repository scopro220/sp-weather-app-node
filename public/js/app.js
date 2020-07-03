const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchLocation.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerText = "Error";
        messageTwo.innerText = data.error;
      } else {
        messageOne.innerText = data.city;
        messageTwo.innerText = data.forecast;
      }
    });
  });
});
