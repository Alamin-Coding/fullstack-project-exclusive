import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import SignupImg from "../assets/signupimg.png";
import { FcGoogle } from "react-icons/fc";
import { Navigate, NavLink, useNavigate } from "react-router";
import { useState } from "react";

import axios from "axios";

const SignUp = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));

		console.log(formData);
	};

	const registration = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_AUTH_URL}/register`,
				{
					name: formData.name,
					email: formData.email,
					password: formData.password
				},
			);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	let Navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();

		registration();
	};

	return (
		<>
			<Container>
				<div className="mt-5 lg:mt-20">
					<BreadCrumb />
				</div>
				<div className="mt-5 lg:mt-15 flex">
					<div className="absolute left-0">
						<img
							src={SignupImg}
							alt="#"
							className="h-149 lg:h-185.25 opacity-15 lg:opacity-100 lg:flex"
						/>
					</div>
					<div className="pl-5 lg:pl-187.25 lg:mt-31.25 z-1">
						<h4 className="text-[36px] font-medium font-inter">
							Create an account
						</h4>
						<p className="font-poppins mt-6">Enter your details below</p>

						<div className="mt-12 ">
							<input
								type="text"
								name="name"
								value={formData.name}
								placeholder="Name"
								className="border-b-2 border-secondary w-92.5 h-8 py-2 focus:outline-none"
								onChange={handleChange}
							/>
						</div>

						<div className="mt-10  ">
							<input
								type="text"
								name="email"
								value={formData.email}
								placeholder="Email"
								className="border-b-2 border-secondary w-92.5 h-8 py-2 focus:outline-none"
								onChange={handleChange}
							/>
						</div>

						<div className="mt-10 mb-10 ">
							<input
								type="password"
								name="password"
								value={formData.password}
								placeholder="Password"
								className="border-b-2 border-secondary w-92.5 h-8 py-2 focus:outline-none"
								onChange={handleChange}
							/>
						</div>

						<div>
							<button
								onClick={handleClick}
								className="text-white px-33 py-4 bg-primary hover:bg-[#d60303] duration-300 rounded-sm cursor-pointer"
							>
								Create Account
							</button>
						</div>

						<div className="mt-8">
							<button className="text-black flex items-center gap-2 border-1 border-secondary hover:text-white hover:bg-black duration-300 px-22 py-4 rounded-sm cursor-pointer">
								<span className="text-2xl">
									<FcGoogle />
								</span>
								Sign up with Google
							</button>
						</div>

						<div className="flex gap-2 items-center mt-8 text-center justify-center">
							<p>Already have account?</p>
							<NavLink
								to="/Login"
								className="hover:border-b-1 hover:border-black font-medium"
							>
								Log in
							</NavLink>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default SignUp;
