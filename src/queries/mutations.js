import { gql } from "@apollo/client";

const createUserMutation = gql`
	mutation(
		$firstName: String!
		$lastName: String!
		$username: String!
		$password: String!
		$email: String!
	) {
		createUser(
			firstName: $firstName
			lastName: $lastName
			username: $username
			password: $password
			email: $email
		) {
			id
			firstName
			lastName
			username
			password
			email
		}
	}
`;

const createExpenseMutation = gql`
	mutation(
		$description: String!
		$amount: String!
		$note: String
		$userId: String
	) {
		createExpense(
			description: $description
			amount: $amount
			note: $note
			userId: $userId
		) {
			id
			description
			amount
			note
			createdAt
			userId
		}
	}
`;

const logInUser = gql`
	mutation($username: String!, $password: String!) {
		logInUser(username: $username, password: $password) {
			username
			id
		}
	}
`;

const updateExpense = gql`
	mutation(
		$id: String!
		$description: String
		$amount: String
		$note: String
	) {
		updateExpense(
			id: $id
			updateExpense: {
				description: $description
				amount: $amount
				note: $note
			}
		) {
			id
			description
			amount
			note
			updatedAt
		}
	}
`;

const deleteExpense = gql`
	mutation($id: String!) {
		deleteExpense(id: $id)
	}
`;

export {
	createUserMutation,
	createExpenseMutation,
	logInUser,
	updateExpense,
	deleteExpense,
};
