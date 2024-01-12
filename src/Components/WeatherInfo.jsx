import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, Card, Container } from "react-bootstrap";

const WeatherInfo = () => {
	const [cityName, setCityName] = useState("");
	const [cityInfo, setCityInfo] = useState(null);

	useEffect(() => {
		if (cityInfo) {
			backgroundChange(cityInfo.weather[0].main);
		}
	}, [cityInfo]);

	const backgroundChange = (weather) => {
		const card =
			document.getElementById("weatherCard"); /*  aggiungo id alla card */
		if (card) {
			if (weather === "Rain") {
				card.style.backgroundImage =
					"url(https://media2.giphy.com/media/GuEyvLPXMLhT2/giphy.gif?cid=ecf05e47vjz30omav5v7vqfp6sf9z2ug9eozqqbud2t6nq4x&ep=v1_gifs_search&rid=giphy.gif&ct=g)";
				card.classList.add("card-background");
			} else if (weather === "Clouds") {
				card.style.backgroundImage =
					"url(https://media1.giphy.com/media/SWlbqGfPURqORorgyu/giphy.gif?cid=ecf05e47pgdkurvu8xslh41sa3wfg0erjq0bor2wwznknjte&ep=v1_gifs_search&rid=giphy.gif&ct=g)";
				card.classList.add("card-background");
			} else if (weather === "Clear") {
				card.style.backgroundImage =
					"url(https://media3.giphy.com/media/0tLvvglXfGOITSFJSU/giphy.gif?cid=ecf05e475gvk4bsx52s0brmynsecm8cenwcxnpt7kjreh09s&ep=v1_gifs_search&rid=giphy.gif&ct=g)";
				card.classList.add("card-background");
			} else if (weather === "Snow") {
				card.style.backgroundImage =
					"url(https://media1.giphy.com/media/cNPoJv04YIm9q/giphy.gif?cid=ecf05e47f2nr8ms9rdmcmnw072ihsrde32yljzqzj6sxqjd1&ep=v1_gifs_related&rid=giphy.gif&ct=g)";
				card.classList.add("card-background");
			} else {
				card.style.backgroundImage =
					"url(https://media1.giphy.com/media/3oriOaEFmDeLQPCFcQ/giphy.gif?cid=ecf05e47rmr85sxbntsqa57v297txtofm9n6lpts0tpoq1eg&ep=v1_gifs_search&rid=giphy.gif&ct=g)";
				card.classList.add("card-background");
			}
		}
	};

	const getCityInfo = async () => {
		try {
			const apiKey = "14bce469fb02143aaed162ec1858afea";
			const resp = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
			);

			if (!resp.ok) {
				throw new Error("City info not found");
			}

			const data = await resp.json();
			setCityInfo(data);
		} catch (error) {
			console.error("Error fetching city info", error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		getCityInfo();
	};

	return (
		<div
			className="vh-100 d-flex align-items-center justify-content-center"
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Card
				id="weatherCard"
				className="weather-card"
				style={{
					width: "18rem",
					backgroundColor: "#87CEEB",
					border: "none",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Card.Body className="card-background">
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<FormControl
								type="text"
								placeholder="Enter city name"
								value={cityName}
								onChange={(e) => setCityName(e.target.value)}
								className="mr-sm-2"
							/>
							<Button variant="primary" type="submit">
								Get City Info
							</Button>
						</Form.Group>
					</Form>

					{cityInfo && (
						<div className="mt-4">
							<h2>City Information</h2>
							<Card
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.8)",
									border: "none",
									boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
									width: "100%",
								}}
							>
								<Card.Body>
									<Card.Title>{cityInfo.name}</Card.Title>
									<Card.Text>
										<strong>Main Weather:</strong> {cityInfo.weather[0].main}
									</Card.Text>
									<Card.Text>
										<strong>Description:</strong>{" "}
										{cityInfo.weather[0].description}
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default WeatherInfo;
