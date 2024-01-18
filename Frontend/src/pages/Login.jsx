import { React, useState, useEffect, useCallback } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ user, updateState }) {
	const [Username, setUsername] = useState('');
	const [Password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const LogIn = async (e) => {
		e.preventDefault()
		console.log("Username: " + Username);
		console.log("Password: " + Password);

		if (Username && Password) {
			try {
				setLoading(true);
				const req = {
					"username": Username,
					"password": Password
				}
				const LOGIN_URL = `http://127.0.0.1:8000/login/`
				const res = await axios.post(LOGIN_URL, req,)
										.then((res) => res.data)
										.catch((err) => console.error(err));
						
				if (res.success) {			
					// updateState=(res.data) 
					updateState({
						"id": res.data.id,
						"name": res.data.name,
						"username": res.data.username,
						"email": res.data.email,
						"token": res.token,
					  })	
					setTimeout(() => navigate('/home'), 500)
				}
				console.log(res);
			} catch (error) {
				setError(error);
				console.log("ERROR: " + error)
			} finally {
				setLoading(false);
			}
		}

		/* let url = `ws://127.0.0.1:8000/ws/employee-socket/`
		const chatSocket = new WebSocket(url)
	
		btn = document.getElementById('btn')
		id = document.getElementById('id')
	
		chatSocket
		chatSocket.onmessage = async function (e) {
			let data = JSON.parse(e.data)
			console.log(data)        
	
				logs = document.getElementById('logs')
				logs.innerHTML += `<p>${data}</p>`
		} */
	}

	return (
		<div className="relative overflow-hidden
						grid place-items-center
						bg-cover bg-no-repeat
						w-full
						h-[calc(100vh-3rem)] md:h-[calc(100vh-5rem)]"
			style={{
				backgroundPosition: "absolute",
				backgroundImage: `url('https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,

			}}>
			<div className="w-[80%] sm:w-[350px]">
				<form>
					<Card className="px-1 sm:px-2 md:px-6 lg:py-4
                    	  			shadow-lg shadow-gray-500/25 dark:shadow-blue-600/45">
						<CardHeader>
							<CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-wide lg:leading-[1.1]">Login</CardTitle>
							<CardDescription className="text-blue-600">Login to access activity dashboard.</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid w-full items-center gap-5">
								<div className="flex flex-col items-start space-y-2.5">
									<Label htmlFor="name">Username</Label>
									<Input id="name" placeholder="Enter your username."
										value={Username}
										onChange={(e) => setUsername(e.target.value)}
										required />
								</div>
								<div className="flex flex-col items-start space-y-2.5">
									<Label htmlFor="password">Password</Label>
									<Input id="password" type="password" placeholder="Enter your password"
										value={Password}
										onChange={(e) => setPassword(e.target.value)}
										required />
								</div>
								<div className="flex justify-center items-center ">
									{
										<Button type="submit"
											className="w-full md:w-[160px] text-md font-bold" variant="default"
											onClick={LogIn}>
											{
												loading ?
													<AiOutlineLoading3Quarters
														className="mr-2 h-4 w-full md:w-[160px] text-md font-bold animate-spin" />
													:
													<>Login</>
											}
										</Button>
									}
								</div>
							</div>
						</CardContent>
					</Card>
				</form>
			</div>
		</div>
	)
}

export default Login