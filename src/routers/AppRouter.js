import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { UserProvider } from "../UserContext";
import CreateExpense from "../components/CreateExpense";
import EditExpense from "../components/EditExpense";
import Expensify from "../components/Expensify";
import Landing from "../components/LandingPage";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import NotFound from "../components/NotFound";
import Register from "../components/Register";
import GuestRoute from "../utilities/GuestRoute";
import UserRoute from "../utilities/UserRoute";

const AppRouter = () => {
	return (
		<UserProvider>
			<Router>
				<div>
					<NavBar />
					<Container>
						<Switch>
							<Route exact path="/" component={Landing} />
							<GuestRoute path="/login" component={Login} />
							<GuestRoute path="/register" component={Register} />
							<UserRoute
								path="/create"
								component={CreateExpense}
							/>
							<Route path="/edit/:id" component={EditExpense} />
							<UserRoute
								path="/expenselist"
								component={Expensify}
							/>
							<Route component={NotFound} />
						</Switch>
					</Container>
				</div>
			</Router>
		</UserProvider>
	);
};

export default AppRouter;
