import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getExpenseById } from "../queries/queries";
import { updateExpense } from "../queries/mutations";
import { useForm } from "../hooks/Hooks";
import { Form, Button, TextArea } from "semantic-ui-react";

const EditExpense = (props) => {
	const expenseId = props.match.params.id;
	const [expenses, setExpense] = useState([]);
	const [errs, setErrors] = useState({});
	const { onSubmitForm, onChange, values } = useForm(editCallback, {
		description: "",
		amount: "",
		note: "",
	});
	const [newAmount, setAmount] = useState("");
	const { loading } = useQuery(getExpenseById, {
		onCompleted({ getExpenseById }) {
			console.log(getExpenseById);
			setExpense(getExpenseById);
		},
		onError(errors) {
			console.log(errors);
		},
		variables: { id: expenseId },
	});

	const [editExpenseHandler] = useMutation(updateExpense, {
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errs);
		},
		onCompleted(_, data) {
			props.history.push("/expenselist");
			window.location.reload();
		},

		variables: {
			id: expenseId,
			...values,
			amount: newAmount,
		},
	});

	function editCallback() {
		editExpenseHandler();
	}

	return (
		<div className="create--container">
			<Form onSubmit={onSubmitForm} className={loading ? "loading" : ""}>
				<h2 className="create--header">
					Edit Expense: {expenses.description}
				</h2>
				<Form.Input
					type="text"
					label="Expense description:"
					name="description"
					onChange={onChange}
					value={values.description}
					error={errs.description ? true : false}
					placeholder="Enter Description"
				/>
				<Form.Input
					type="text"
					label="Expense Amount"
					onChange={(e) => {
						const validateAmount = e.target.value;
						if (
							!validateAmount ||
							validateAmount.match(/^\d{1,}(\.\d{0,2})?$/)
						) {
							setAmount(validateAmount);
						}
					}}
					value={newAmount}
					error={errs.amount ? true : false}
					placeholder="Enter Amount"
				/>
				<label className="textarea--label">Expense Note:</label>
				<TextArea
					type="text"
					name="note"
					onChange={onChange}
					value={values.note}
					placeholder="Enter your Note (optional)"
				/>
				<Button className="create--button" primary>
					Edit Expense
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

export default EditExpense;
