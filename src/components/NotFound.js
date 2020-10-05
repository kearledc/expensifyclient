import React from "react";
import { Link } from "react-router-dom";

export default () => (
	<div className="notfound--container">
		<h2 className="notfound--header">404!</h2>
		<p>
			Page not Found Please Click <Link to="/">Me</Link> to Return Home
		</p>
	</div>
);
