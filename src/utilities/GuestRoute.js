import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Route } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";

const GuestRoute = ({ component: Component }) => {
	const { user } = useContext(UserContext);
	return (
		<Route
			render={(props) =>
				user ? <Unauthorized /> : <Component {...props} />
			}
		/>
	);
};

export default GuestRoute;
