class Forecast {
	constructor() {
		this.key = "eed80c0252124b9686f163329222706";
		this.weatherURI = "http://api.weatherapi.com/v1/current.json";
		this.cityURI = "http://api.weatherapi.com/v1/search.json";
	}

	async getCity(city) {
		const query = `?key=${this.key}&q=${city}`;
		const response = await fetch(this.cityURI + query);
		const data = await response.json();

		return data[0];
	}
	async getWeather(city) {
		const query = `?key=${this.key}&q=${city}&aqi=no`;
		const response = await fetch(this.weatherURI + query);
		const data = await response.json();

		return data.current;
	}
	async updateCity(city) {
		const weatherDetails = await this.getWeather(city);
		const cityDetails = await this.getCity(city);

		return {
			weatherDetails,
			cityDetails,
		};
	}
}
