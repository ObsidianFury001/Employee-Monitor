import { useState, useEffect, useCallback } from 'react'

function Dashboard() {
    
	const [UserRecord, setUserRecord] = useState(0);

	// Get Real time updates
	/* const GetMessages = useCallback((id, status) => {
		setNewUser(id)
		setNewStatus(status)
	}, [userNewStatus]);
	
	useEffect(() => {
		let url = `ws://127.0.0.1:8000/ws/employee-socket/`
		const chatSocket = new WebSocket(url)
	
		chatSocket.onmessage = async function (e) {
			let data = JSON.parse(e.data)
			console.log(data.status)    
			GetMessages(data.id, data.status)
		} 	
	}, [userNewUser, userNewStatus]) 
 */

    return (
        <div>dashboard</div>
    )
}

export default Dashboard
