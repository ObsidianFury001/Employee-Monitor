import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import moment from "moment";

// Data tables and Columns
import DataTable from '@/components/datatable/DataTable';
import columns from '@/components/datatable/Columns';
import { useNavigate } from 'react-router-dom';

// Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Dashboard({ user, updateState }) {
	let counter = 0;

	// Loading states
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Dashboard States
	const [data, setData] = useState([]);

	// Navigator
	const navigate = useNavigate();

	const GetEmployeeList = async () => {
		try {
			setLoading(true);
			console.log('getting data')
			let res = await axios.get(`http://127.0.0.1:8000/employees/`)
				.then((res) => res.data)
				.catch((err) => console.error(err));
			setData(res.data)
		} catch (error) {
			setError(error);
			console.log("ERROR: " + error)
		} finally {
			setLoading(false);
		}
	}

	const ValidateUser = () => {
		if (user.id) return true;
		else return false;
	};

	const UpdateDataRow = useCallback((user_id, user_status, last_seen) => {
		setData(prevData => {
			console.log("🚀 ~ UpdateDataRow ~ prevData:", prevData)
			
			const updatedData = prevData.map(x => {
				if (x.id == user_id) {
					
					// console.log("RECORD UPDATED: " + x);
					return { ...x, status: user_status, last_seen: moment(String(x.last_seen)).format('lll')};
				}
				return x;
			});
			return updatedData;
		});
	}, []);


	const handleConnectionClose = async () => {
		const LOGIN_URL = `http://127.0.0.1:8000/logout/`
		const res = await axios.post(LOGIN_URL, { id: user.id },)
			.then((res) => res.data)
			.catch((err) => console.error(err));
		console.log(res)
	};

	const StartWebSocket = () => {
		const socket = new WebSocket('ws://127.0.0.1:8000/ws/employee-socket/');
		socket.onopen = () => {
			console.log('WebSocket connection opened');
			const initialMessage = {
				type: 'status_online',
				id: String(user.id),
				username: String(user.username),
				status: String(user.status),
			};
			socket.send(JSON.stringify(initialMessage));
		};

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			console.log('WebSocket message received: ' + ++counter, message);

			if (message && message.id) {
				UpdateDataRow(message?.id, message?.status, message?.last_seen);
			} else {
				console.error('Invalid message format:', message);
			}
		};

		socket.onclose = (event) => {
			console.log('WebSocket connection closed:', event);
			const finalMessage = {
				type: 'status_offline',
				id: String(user.id),
				username: String(user.username),
				status: String(user.status),
			};
			socket.send(JSON.stringify(finalMessage));
			handleConnectionClose();
		};

		// Clean up WebSocket connection
		return () => {
		  console.log('WebSocket connection cleanup');
		  socket.close();
		};
	}

	useEffect(() => {
		if (ValidateUser()) {
			const fetchData = async () => {
				await GetEmployeeList();

					StartWebSocket();
			}
			fetchData();
		} else 
			navigate('/')
	}, [])

	return (
		<>
			<section className="container grid place-items-center
						p-5">
				<h1 className='text-3xl font-medium leading-10'>
					Employee Dashboard
				</h1>
				{
					loading ? (
						<section className="container grid place-items-center
		py-10 px-5">
							<AiOutlineLoading3Quarters
								className="animate-spin" />
						</section>
					) :
						<DataTable columns={columns} data={data} />
				}
			</section >
		</>
	)
}

export default Dashboard
