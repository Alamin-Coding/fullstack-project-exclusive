import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import SignupImg from "../assets/signupimg.png";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../Slices/authSlice";
import { toast } from "react-toastify";


const Login = () => {
	const notify = (message) => toast(message);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {value} = useSelector((state)=> state.auth);

	console.log("Store value", value)



	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [errorMessage, setErrorMessage] = useState("")

	const handleChange = (e)=> {
		const {name, value} = e.target;
		
		setFormData( (prev) =>  ({...prev, [name]: value}))
	}

	const handleLogin = async ()=> {
		try {
			const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/login`, {
				email:formData.email, password:formData.password
			})
			dispatch(login(response.data.userInfo))
			if (!response.data.success) {
				setErrorMessage(response.data.message)
				console.log("1223")
				notify(errorMessage)
			}else{
				navigate("/")
				notify(response.data.message)
			}
			

			
		} catch (error) {
			console.log(error)
		}
	}


	return (
		<>
			<Container>
				<div className="mt-5 lg:mt-20">
					<BreadCrumb />
				</div>
				<div className="mt-5 lg:mt-15 lg:pb-35 flex">
					<div className="absolute left-0">
						<img
							src={SignupImg}
							alt="#"
							className="h-100 lg:h-175 opacity-15 lg:opacity-100 lg:flex"
						/>
					</div>
					<div className="pl-5 lg:pl-187.25 lg:mt-31.25 z-1">
						<h4 className="text-[36px] font-medium font-inter">
							Log in into Exlusive
						</h4>
						<p className="font-poppins mt-6">Enter your details below</p>

						<div className="mt-10  ">
							<input
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email or Phone Number"
								className="border-b-2 border-secondary w-92.5 h-8 py-2 focus:outline-none"
							/>
						</div>

						<div className="mt-10 mb-10 ">
							<input
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Password"
								className="border-b-2 border-secondary w-92.5 h-8 py-2 focus:outline-none"
							/>
						</div>

						<div className="flex gap-22 items-center">
							<button onClick={handleLogin} className="text-white px-12  py-4 bg-primary hover:bg-[#d60303] rounded-sm">
								Log in
							</button>
							<NavLink className="text-primary hover:border-b-1">
								Forget Password?
							</NavLink>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Login;
