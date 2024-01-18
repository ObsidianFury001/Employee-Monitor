import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import WebSocketClient from 'websocket';
import DataTable from '@/components/datatable/DataTable';
import columns from '@/components/datatable/Columns';
// Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Dashboard({user, updateState}) {
	let counter = 0;
	// Loading states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
	// Dashboard States
	const [data, setData] = useState([]);
	const [newUser, setNewUser] = useState({ id: null, value: null });

	const GetEmployeeList = async () => {
		try {
			setLoading(true);
			console.log('getting data')
			let res = await axios.get(`http://127.0.0.1:8000/employees/`)
				.then((res) => res.data)
				.catch((err) => console.error(err));
			setData(res.data)
			setLoading(false);
		} catch (error) {
			setError(error);
			console.log("ERROR: " + error)
		} finally {
			setLoading(false);
		}
	}

	const ValidateUser = () => {
		if (user.id) 
			return true
		else 
			return false 
	};


	const UpdateDataRow= useCallback(() => {
		const indexToUpdate = data.findIndex(user => user.id === newUser.id);

		if (indexToUpdate !== -1) {
		  setData(prevData => [
			...prevData.slice(0, indexToUpdate),
			{ ...prevData[indexToUpdate], status: newUser.status },
			...prevData.slice(indexToUpdate + 1)
		  ]);
		}
	}, [user])

	const updateNewUser = (user_id, user_status) => {
		setNewUser((prevUser) => ({
			id: user_id,
			status: user_status,
		}));
		UpdateDataRow();
	}

	const handleNewConnection = () => {
		// console.log('Handling new connection:');
	};

	const handleStatusUpdate = () => {
		// console.log(`Handling new user id: ${String(user.id)} ${String(user.name)} & status: ${user.status}` );
		updateNewUser(user.id, user.status)
	};

	const handleConnectionClose = async () => {
		const LOGIN_URL = `http://127.0.0.1:8000/logout/`
		const res = await axios.post(LOGIN_URL, { id: user.id},)
								.then((res) => res.data)
								.catch((err) => console.error(err));
		console.log(res)
	};

	const handleDefault = () => {
		// console.log('Handling default');
	};

	const StartWebSocket = (id, status) => {

		const socket = new WebSocket('ws://127.0.0.1:8000/ws/employee-socket/');

		socket.onopen = () => {
			console.log('WebSocket connection opened');
			const initialMessage = {
				type: 'new_connection',
				id: String(user.id),
				username: String(user.username),
				status: String(user.status),
			};
			socket.send(JSON.stringify(initialMessage));
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('WebSocket message received: ' + ++counter, data);
			
			setNewUser({
				id: data.id,
				status: data.status
			});

			// Handle different message types
			switch (data.type) {
				case 'new_login':
					handleNewConnection()
					break;
				case 'status_online': 
					handleStatusUpdate()
					break;
				case 'status_offline':
					handleConnectionClose();
					
					setNewUser((prevUser) => ({
						id: user_id,
						status: user_status,
					}));
					break;
				default: handleDefault()
					break;
			}
		};

		socket.onclose = (event) => {
			console.log('WebSocket connection closed:', event);
			handleConnectionClose();					
		};
	}

	useEffect(() => {
		GetEmployeeList()
		if (ValidateUser())
			StartWebSocket();
	}, [])

	return (
		<section className="container grid place-items-center
							p-5">

			<h1 className='text-2xl font-bold mb-5'>Employee Dashboard {JSON.stringify(newUser.id)}
			: {JSON.stringify(newUser.name)}</h1>
			{
				
				loading? (

					<section className="container grid place-items-center
		py-10 px-5">
						<AiOutlineLoading3Quarters
							className="animate-spin" />
					</section>
				) :
				
			<DataTable columns={columns} data={data} />
			}
		</section >
	)
}

export default Dashboard
