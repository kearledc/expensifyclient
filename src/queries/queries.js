import { gql } from "@apollo/client";

const getUsersQuery = gql`
	{
		getUsers {
			firstName
			lastName
			username
			password
			id
			expenses {
				description
				amount
				createdAt
				id
				note
			}
		}
	}
`;

const getExpensesQuery = gql`
	{
		getExpenses {
			id
			description
			amount
			note
			createdAt
		}
	}
`;

const getUserById = gql`
	query($id: String) {
		getUserById(userId: $id) {
			firstName
			lastName
			username
			expenses {
				description
				amount
				id
				createdAt
				note
			}
		}
	}
`;

const getExpenseById = gql`
	query($id: String) {
		getExpenseById(expenseId: $id) {
			description
			amount
			note
			id
		}
	}
`;

export { getUsersQuery, getExpensesQuery, getUserById, getExpenseById };
