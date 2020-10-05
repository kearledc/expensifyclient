import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRouter from "./routers/AppRouter";
import Footer from "./components/Footer";

const client = new ApolloClient({
	uri: "https://blooming-wave-01143.herokuapp.com/expensify",
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<div>
				<div className="main--container">
					<AppRouter />
				</div>
				<Footer />
			</div>
		</ApolloProvider>
	);
};

export default App;
