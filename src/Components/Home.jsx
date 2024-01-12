// Home.js
import React from "react";
import WeatherInfo from "./WeatherInfo";

function Home() {
	return (
		<div className="App">
			<h1 className="app-title">Welcome to WhatsoWeather</h1>
			<WeatherInfo />
		</div>
	);
}

export default Home;
