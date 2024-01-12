import React, { useState, useEffect } from "react";

const Forecast = ({ city }) => {
	const [forecastData, setForecastData] = useState(null);

	useEffect(() => {
		const getForecastData = async () => {
			try {
				const apiKey = "14bce469fb02143aaed162ec1858afea";
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
				);

				if (!response.ok) {
					throw new Error("Forecast data not found");
				}

				const data = await response.json();
				setForecastData(data);
			} catch (error) {
				console.error("Error fetching forecast data", error);
			}
		};

		getForecastData();
	}, [city]);

	return (
		<div>
			{forecastData ? (
				<div>
					<h1>5-Day Forecast for {city}</h1>
				</div>
			) : (
				<p>Loading forecast data...</p>
			)}
		</div>
	);
};

export default Forecast;
