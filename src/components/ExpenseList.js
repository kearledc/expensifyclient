import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getUserById } from "../queries/queries";
import ExpenseListItem from "./ExpenseListItem";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ExpenseList = () => {
	const user = localStorage.getItem("id");
	const [expenses, setExpense] = useState([]);
	const { loading } = useQuery(getUserById, {
		OnError(errors) {
			console.log(errors);
		},
		onCompleted({ getUserById: { expenses } }) {
			setExpense(expenses);
		},

		variables: { id: user },
	});

	const expenseList = loading ? (
		<Dimmer active inverted>
			<Loader inverted>Loading</Loader>
		</Dimmer>
	) : (
		<div className="expense--container">
			{expenses.length === 0 ? (
				<div className="noexpenses--container">
					<h2>Uh Oh.. There Seems to be nothing Here..</h2>
					<Button as={Link} to="/create" color="green">
						Create Expense
					</Button>
				</div>
			) : (
				<div className="expenselist--container">
					<h1>Here are your Expenses:</h1>
					<div className="expenseslistitem-container">
						{expenses.map((expense) => (
							<ExpenseListItem {...expense} key={expense.id} />
						))}
					</div>
				</div>
			)}
		</div>
	);

	return expenseList;
};

export default ExpenseList;
