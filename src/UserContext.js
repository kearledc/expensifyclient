import React, { useReducer, createContext } from "react";

const initialState = {
	user: null,
};

if (localStorage.getItem("id")) {
	const userId = localStorage.getItem("id");
	initialState.user = userId;
}

const UserContext = createContext({
	user: null,
	logInuser: (userData) => {},
	logOutUser: () => {},
});

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

const UserProvider = (props) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
	const logInUser = (userData) => {
		localStorage.setItem("id", userData.id);
		dispatch({
			type: "LOGIN",
			payload: userData,
		});
	};

	const logOutUser = () => {
		localStorage.removeItem("id");
		dispatch({
			type: "LOGOUT",
		});
	};

	return (
		<UserContext.Provider
			value={{
				user: state.user,
				logInUser,
				logOutUser,
			}}
			{...props}
		/>
	);
};

export { UserProvider, UserContext };
