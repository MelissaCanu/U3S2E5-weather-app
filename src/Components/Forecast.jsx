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
					`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=1&appid=${apiKey}`
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
					<Row xs={1} md={2} lg={4} className="g-4">
						{forecastData.list.map((item, index) => (
							<Col key={index}>
								<Card>
									<Card.Body>
										<Card.Title>{item.weather[0].main}</Card.Title>
										<Card.Text>
											<strong>Description:</strong>{" "}
											{item.weather[0].description}
										</Card.Text>
										<Card.Text>
											<strong>Icon:</strong> {item.weather[0].icon}
										</Card.Text>
										<Card.Text>
											<strong>Temperature:</strong> {item.main.temp} °C
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
