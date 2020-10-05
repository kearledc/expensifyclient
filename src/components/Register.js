import React, { useState } from "react";
import { useForm } from "../hooks/Hooks";
import { useMutation } from "@apollo/client";
import { createUserMutation } from "../queries/mutations";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

const Register = () => {
	const history = useHistory();
	const [errs, setErrors] = useState({});
	const { onSubmitForm, onChange, values } = useForm(registerCallback, {
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		email: "",
	});

	const [registerHandler, { loading }] = useMutation(createUserMutation, {
		onCompleted(data) {
			history.push("/login");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errs);
		},
		variables: values,
	});

	function registerCallback() {
		registerHandler();
	}

	return (
		<div className="register--container">
			<Form onSubmit={onSubmitForm} className={loading ? "loading" : ""}>
				<h2>Register</h2>
				<Form.Input
					type="text"
					name="firstName"
					value={values.firstName}
					onChange={onChange}
					placeholder="Enter your First Name"
					error={errs.firstName ? true : false}
					label="First Name:"
				/>
				<Form.Input
					type="text"
					name="lastName"
					value={values.lastName}
					onChange={onChange}
					placeholder="Enter your Last Name"
					label="Last Name"
					error={errs.lastName ? true : false}
				/>
				<Form.Input
					type="text"
					label="Username"
					name="username"
					value={values.username}
					onChange={onChange}
					placeholder="Enter your username"
					error={errs.username ? true : false}
				/>
				<Form.Input
					type="password"
					name="password"
					label="Password:"
					value={values.password}
					onChange={onChange}
					placeholder="Enter your password"
					error={errs.password ? true : false}
				/>
				<Form.Input
					type="email"
					label="E-mail Address:"
					name="email"
					value={values.email}
					onChange={onChange}
					placeholder="Enter your email address"
					error={errs.email ? true : false}
				/>
				<Button primary type="submit">
					Register User
				</Button>
			</Form>

			{Object.keys(errs).length > 0 && (
				<div className="error ui message">
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
export default Register;
