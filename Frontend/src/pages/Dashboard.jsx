import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import WebSocketClient from 'websocket';

// Buttons
import { Button } from '@/components/ui/button';
import ColumnFilter from '@/components/datatable/ColumnFilter';

// Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// Datatables
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import columns from '@/components/datatable/Columns';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function Dashboard() {
	// Dashboard States
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [newUser, setNewUser] = useState({ id: null, value: null });

	// Column Filters
	const [columnFilters, setColumnFilters] = useState([{
		id: "username",
		value: ""
	}]);

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

	const updateNewUser = useCallback((data) => {
		setNewUser((prevUser) => ({
			id: data.id,
			value: data.value,
		}));
	},
		[setNewUser]
	);

	const handleNewConnection = (data) => {
		console.log('Handling new connection:', data);
	};

	const handleStatusUpdate = (data) => {
		console.log('Handling new user id & status:', data);
	};


	const newSocket = (id, status) => {

		const socket = new WebSocket('ws://127.0.0.1:8000/ws/employee-socket/');

		socket.onopen = () => {
			console.log('WebSocket connection opened');
			const initialMessage = {
				type: 'new_connection',
				message: 'Hello from React!',
				id: 1,
				username: 'john_doe',
				status: 'active',
			};
			socket.send(JSON.stringify(initialMessage));
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('WebSocket message received:', data);

			// Handle different message types
			switch (data.type) {
				case 'new_connection':
					handleNewConnection()
				case 'status_update':
					handleStatusUpdate()
				default:
					break;
			}
		};

		socket.onclose = (event) => {
			console.log('WebSocket connection closed:', event);
		};
	}

	useEffect(() => {
		GetEmployeeList()
		// newSocket();
	}, [])

	// Initialize React Table
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			columnFilters,
			//   pagination: true,
			//   columnVisibility: true,
			//   columnFilters: true,
			//   rowSelection: true,
		},
	})

	return (
		<section className="container grid place-items-center
							p-5">

			<h1 className='text-2xl font-bold mb-5'>Employee Dashboard</h1>
			<div className='container'>
				<div className='flex justify-start items-center py-2'>
					<ColumnFilter columnFilters={columnFilters}
						setColumnFilters={setColumnFilters} />
				</div>
				<div className="py-2">
					{
						loading == false ?
							(
								<div className="w-full rounded-md border-2 p-2">
									<Table>
										<TableHeader className>
											{table.getHeaderGroups().map((headerGroup) => (
												<TableRow key={headerGroup.id}>
													{headerGroup.headers.map((header) => (
														<TableHead key={header.id}>
															<Button className={cn("px-2")}
																variant="ghost"
																onClick={header.column.getToggleSortingHandler()}
															>
																{
																	flexRender(header.column.columnDef.header,
																		header.getContext())
																}
																{header.column.getCanSort() &&
																	<ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>}
															</Button>
														</TableHead>
													))}
												</TableRow>
											))}
										</TableHeader>
										<TableBody>
											{
												table.getRowModel().rows?.length ?

													table.getRowModel().rows.map((row) => (
														<TableRow key={row.id}
															className="h-12 px-2">
															{row.getVisibleCells().map((cell) => (
																<TableCell key={cell.id} className="px-4">
																	{flexRender(cell.column.columnDef.cell, cell.getContext())}
																</TableCell>
															))}
														</TableRow>
													)) :
													<TableRow>
														<TableCell
															colSpan={columns.length}
															className="h-24 text-center">
															No results.
														</TableCell>
													</TableRow>
											}
										</TableBody>
									</Table>
								</div>
							)
							: (

								<section className="container grid place-items-center
					py-10 px-5">
									<AiOutlineLoading3Quarters
										className="animate-spin" />
								</section>
							)
					}

					<div className="flex items-center justify-end space-x-2 py-4">
						<div className="flex-1 text-sm text-muted-foreground">
							{table.getFilteredRowModel().rows.length} record(s).
						</div>
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Next
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section >
	)
}

export default Dashboard
