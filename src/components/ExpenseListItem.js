import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { deleteExpense } from "../queries/mutations";
import { Card, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

const ExpenseListItem = ({ id, description, amount, createdAt, note }) => {
	const onDeleteExpenseHandler = () => {
		Swal.fire({
			title: "Are you sure you want to remove this Expense?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.value) {
				Swal.fire(
					"Deleted!",
					"Expense has been deleted.",
					"success"
				).then(onDeleteExpenseCallback);
			}
		});
	};

	const [onDeleteExpenseCallback] = useMutation(deleteExpense, {
		update() {
			window.location.reload();
		},
		variables: { id },
	});

	return (
		<div className="expense--item">
			<Card.Group>
				<Card>
					<Card.Content>
						<Card.Header>
							<Link to={`./edit/${id}`}>{description}</Link>
						</Card.Header>
						<Card.Meta>{createdAt}</Card.Meta>
						<Card.Description>
							Amount:
							<strong>{amount}</strong>
							<p>Note: {note}</p>
						</Card.Description>
					</Card.Content>
					<Button
						color="red"
						inverted
						onClick={onDeleteExpenseHandler}
					>
						Delete
					</Button>
				</Card>
			</Card.Group>
		</div>
	);
};
export default ExpenseListItem;
