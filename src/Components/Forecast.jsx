import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

const Forecast = () => {
	const { city } = useParams();
	const [forecastData, setForecastData] = useState(null);

	useEffect(() => {
		console.log("City:", city);
		const getForecastData = async () => {
			try {
				const apiKey = "14bce469fb02143aaed162ec1858afea";
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${apiKey}`
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

	/*  prendi il giorno della settimana - se ti ricordi come fare */

	const getDayOfWeek = (dateString) => {
		const weekDays = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const date = new Date(dateString);
		const dayIndex = date.getDay();
		return weekDays[dayIndex];
	};

	return (
		<div>
			{forecastData ? (
				<div>
					<h1>5-Day Forecast for {city}</h1>
					<Row xs={1} md={2} lg={4} className="g-4">
						{forecastData.list.map((item, index) => (
							<Col key={index}>
								<Card
									style={{
										backgroundColor: "#87CEEB",
										border: "none",
										boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Card.Body className="card-background">
										<Card.Title>{getDayOfWeek(item.dt_txt)}</Card.Title>
										<Card.Text>
											<strong>Temperature:</strong> {item.main.temp} °C
										</Card.Text>
										<Card.Text>
											<strong>Weather:</strong> {item.weather[0].main}
										</Card.Text>
										<Card.Text>
											<strong>Description:</strong>{" "}
											{item.weather[0].description}
										</Card.Text>
										<Card.Text>
											<strong>Humidity:</strong> {item.main.humidity}%
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			) : (
				<p>Loading forecast data...</p>
			)}
		</div>
	);
};

export default Forecast;
