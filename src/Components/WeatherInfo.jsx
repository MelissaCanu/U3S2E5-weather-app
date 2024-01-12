import React, { useState, useEffect } from "react";
import {
	Button,
	Form,
	FormControl,
	Card,
	Container,
	Row,
	Col,
} from "react-bootstrap";

const WeatherInfo = () => {
	const [cityName, setCityName] = useState("");
	const [cityInfo, setCityInfo] = useState(null);

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
		<Container className="vh-100 d-flex align-items-center justify-content-center">
			<Card
				style={{
					width: "18rem",
					backgroundColor: "#87CEEB",
					border: "none",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				}}
			>
				<Card.Body>
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
		</Container>
	);
};

export default WeatherInfo;
