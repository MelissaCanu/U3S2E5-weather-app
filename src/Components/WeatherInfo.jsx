import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

const WeatherInfo = () => {
	const [cityId, setCityId] = useState("");
	const [cityInfo, setCityInfo] = useState(null);

	const getCityInfo = async () => {
		try {
			const apiKey = "14bce469fb02143aaed162ec1858afea";
			const resp = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
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
		<div>
			<Form inline onSubmit={handleSubmit}>
				<FormControl
					type="text"
					placeholder="Enter city ID"
					value={cityId}
					onChange={(e) => setCityId(e.target.value)}
					className="mr-sm-2"
				/>
				<Button variant="primary" type="submit">
					Get City Info
				</Button>
			</Form>

			{cityInfo && (
				<div>
					<h2>City Information</h2>
					<p>City: {cityInfo.name}</p>
				</div>
			)}
		</div>
	);
};

export default WeatherInfo;
