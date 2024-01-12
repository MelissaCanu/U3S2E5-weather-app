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

	/* bg image */

	const getBackgroundImage = (weather) => {
		const backgroundImages = {
			Clear:
				"url(https://media2.giphy.com/media/RqSJ6nQVsOpxe/200.webp?cid=ecf05e47b5sdwo0oze5kp98289o9t4m825cwqy4gnvmp32he&ep=v1_gifs_search&rid=200.webp&ct=g)",
			Clouds:
				"url(https://media3.giphy.com/media/VmoYjGrAccGCo50ahx/giphy.gif?cid=ecf05e47x0nvhz4gsdccx534xu4ec4t0d5567d2u1gufvx9o&ep=v1_gifs_search&rid=giphy.gif&ct=g)",
			Rain: "url(https://media0.giphy.com/media/39fj7g99qyD72/giphy.gif?cid=ecf05e47goepd7p6srvqf1qw5b9ldx8n943ion2n01rnrn1i&ep=v1_gifs_search&rid=giphy.gif&ct=g)",
			Snow: "url(https://media1.giphy.com/media/ZdlSqZuzzMB1JT3nwT/giphy.gif?cid=ecf05e47c0o704ptclmfyfne1vs3umapzjre1ycvk5dtz2hc&ep=v1_gifs_search&rid=giphy.gif&ct=g)",
		};
		const defaultImage = "url(default-image-url.jpg)";
		return backgroundImages[weather] || defaultImage;
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
									id="weatherCard"
									style={{
										backgroundImage: getBackgroundImage(item.weather[0].main),
										backgroundSize: "cover",
										backgroundColor: "#87CEEB",
										border: "none",
										boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										height: "300px",
										width: "300px",
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
