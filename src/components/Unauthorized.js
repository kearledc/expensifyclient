import React from "react";
import { Link } from "react-router-dom";

export default () => (
	<div className="notfound--container">
		<h2 className="notfound--header">404!</h2>
		<p>
			You're Not Authorized to view this Page Return
			<Link to="/"> Home</Link>
		</p>
	</div>
);
