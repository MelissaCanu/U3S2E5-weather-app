import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Forecast from "./Components/Forecast";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/forecast/:city" element={<Forecast />} />
			</Routes>
		</Router>
	);
}
export default App;
