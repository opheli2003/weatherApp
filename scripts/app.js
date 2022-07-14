const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

console.log(forecast);

const updateUI = (data) => {
	const { cityDetails, weatherDetails } = data;

	details.innerHTML = `
              <h5 class="my-3">${cityDetails.name}</h5>
              <div class="my-3">${weatherDetails.condition.text}</div>
              <div class="display-4 my-4">
              <span>${weatherDetails.temp_c}</span>
              <span>°C</span>
            
            `;

	let timeSrc = weatherDetails.is_day ? "icons/daday.svg" : "icons/danight.svg";

	time.setAttribute("src", timeSrc);

	icon.setAttribute("src", weatherDetails.condition.icon);

	card.classList.remove("d-none");
};

cityForm.addEventListener("submit", (evt) => {
	evt.preventDefault();

	const city = cityForm.city.value.trim();

	cityForm.reset();

	forecast
		.updateCity(city)
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));

	localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
	forecast
		.updateCity(localStorage.getItem("city"))
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));
}
