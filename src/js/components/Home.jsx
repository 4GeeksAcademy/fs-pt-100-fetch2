import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { JSONPlaceHolder } from "./jsonPlaceHolder.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">

			<div className="bg-success">
				<h3>MAS FETCH!</h3>
			</div>
			<div>
				<p>fetch por promesas en clase anterior</p>
				<p>fetch().then().then().catch()</p>
			</div>
			<div>
				<p>fetch porfuncion asyncrona en esta!</p>
			</div>
			<JSONPlaceHolder />

		</div>
	);
};

export default Home;