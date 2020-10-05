import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "../hooks/Hooks";
import { createExpenseMutation } from "../queries/mutations";
import { Form, Button, TextArea, Dimmer, Loader } from "semantic-ui-react";

const CreateExpense = ({ history }) => {
	const userId = localStorage.getItem("id");
	const [errs, setError] = useState({});
	const [newAmount, setNewAmount] = useState("");
	const { onChange, onSubmitForm, values } = useForm(createCallback, {
		description: "",
		amount: "",
		note: "",
		userId,
	});

	const [createExpenseHandler, { loading }] = useMutation(
		createExpenseMutation,
		{
			update(_, data) {
				history.push("./expenselist");
				window.location.reload();
			},
			onError(err) {
				setError(err.graphQLErrors[0].extensions.exception.errs);
			},
			variables: { ...values, amount: newAmount },
		}
	);

	function createCallback() {
		createExpenseHandler();
	}

	const createExpense = loading ? (
		<Dimmer active inverted>
			<Loader inverted>Loading</Loader>
		</Dimmer>
	) : (
		<div className="create--container">
			<Form onSubmit={onSubmitForm} className={loading ? "loading" : ""}>
				<h2 className="create--header">Create an Expense</h2>
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
							setNewAmount(validateAmount);
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
					Create Expense
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

	return createExpense;
};
export default CreateExpense;
