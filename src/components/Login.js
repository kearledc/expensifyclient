import React, { useContext, useState } from "react";
import { logInUser } from "../queries/mutations";
import { useForm } from "../hooks/Hooks";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Form, Button } from "semantic-ui-react";

const Login = () => {
	const context = useContext(UserContext);
	const [errs, setError] = useState({});
	const { onChange, onSubmitForm, values } = useForm(loginCallback, {
		username: "",
		password: "",
	});
	const history = useHistory();

	const [loggingInHandler] = useMutation(logInUser, {
		onCompleted({ logInUser }) {
			context.logInUser(logInUser);
			history.push("/expenselist");
		},
		onError(err) {
			setError(err.graphQLErrors[0].extensions.exception.errs);
		},
		variables: values,
	});

	function loginCallback() {
		loggingInHandler();
	}

	return (
		<div className="login--container">
			<Form onSubmit={onSubmitForm}>
				<h2>Login User</h2>
				<Form.Field>
					<Form.Input
						label="Username:"
						type="text"
						name="username"
						value={values.username}
						onChange={onChange}
						error={errs.username ? true : false}
						placeholder="Enter your Username"
					/>
				</Form.Field>
				<Form.Input
					label="Password:"
					name="password"
					type="password"
					value={values.password}
					onChange={onChange}
					error={errs.password ? true : false}
					placeholder="Enter your Password"
				/>
				<Button color="green">Login</Button>
			</Form>
			{Object.keys(errs).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errs).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
export default Login;
