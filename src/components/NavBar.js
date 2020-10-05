import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Menu } from "semantic-ui-react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const NavBar = () => {
	const { user, logOutUser } = useContext(UserContext);
	const pathname = window.location.pathname;
	const path = pathname === "/" ? "home" : pathname.substr(1);
	const [activeItem, setActive] = useState(path);
	const handleItemClick = (e, { name }) => setActive(name);
	const history = useHistory();

	const logOutUserHandler = () => {
		Swal.fire({
			title: "Are you sure you want to log out?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((res) => {
			if (res.value) {
				logOutUser();
				history.push("./");
			}
		});
	};

	const navBar = user ? (
		<div className="navbar--container">
			<Menu pointing secondary inverted>
				<Menu.Item
					name="Expensify"
					as={Link}
					to="/expenselist"
					active={activeItem === "expenselist"}
				/>

				<Menu.Menu position="right">
					<Menu.Item
						name="Create an Expense"
						active={activeItem === "Create an Expense"}
						onClick={handleItemClick}
						as={Link}
						to="/create"
					/>

					<Menu.Item name="logOut" onClick={logOutUserHandler} />
				</Menu.Menu>
			</Menu>
		</div>
	) : (
		<div className="navbar--container">
			<Menu pointing secondary size="massive" inverted>
				<Menu.Item
					name="Expenisify"
					active={activeItem === "home"}
					onClick={handleItemClick}
					as={Link}
					to="/"
				/>
				<Menu.Menu position="right">
					<Menu.Item
						name="login"
						active={activeItem === "login"}
						onClick={handleItemClick}
						as={Link}
						to="/login"
					/>
				</Menu.Menu>

				<Menu.Item
					name="Register"
					active={activeItem === "Register"}
					onClick={handleItemClick}
					as={Link}
					to="/register"
				/>
			</Menu>
		</div>
	);

	return navBar;
};
export default NavBar;
