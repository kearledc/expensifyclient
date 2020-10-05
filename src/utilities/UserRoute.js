import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Route } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";

const UserRoute = ({ component: Component }) => {
	const { user } = useContext(UserContext);
	return (
		<Route
			render={(props) =>
				user ? <Component {...props} /> : <Unauthorized />
			}
		/>
	);
};

export default UserRoute;
