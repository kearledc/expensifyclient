import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LandingPage = () => (
	<section className="landing--container animate__animated animate__bounceinDown">
		<h1 className="landing--header">Welcome to Expensify App</h1>
		<p className="landing--decsription">
			It's a Simple app where you can track your expenses monthly and
			compare your spending habits monthly
		</p>
		<p className="landing--decsription">
			Start Today By logging in and Registering your account to log your
			first expense on the page
		</p>
		<p className="landing--decsription">
			To Start please Register an Account or Login your Existing Account
		</p>
		<p className="landing--decsription">
			Once Logged in Start Creating your expenses and Compare them daily,
			weekly or monthly
		</p>
		<div className="button-container">
			<Button as={Link} to="./login" color="green">
				Login
			</Button>
			<Button as={Link} to="./register" primary>
				Register
			</Button>
		</div>
	</section>
);

export default LandingPage;
