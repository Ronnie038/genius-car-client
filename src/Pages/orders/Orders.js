import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
	const { user, logout } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);

	const handleDelete = (id) => {
		const procced = window.confirm(
			'Are you sure ,you want to cancel this order'
		);
		if (procced) {
			fetch(`https://genius-car-server-five-bice.vercel.app/orders/${id}`, {
				method: 'delete',
				headers: {
					authorization: `Bearer ${localStorage.getItem('genius-token')}`,
				},
			})
				.then((res) => {
					if (res.ok) {
						const remainingOrder = orders.filter((order) => order._id !== id);
						setOrders(remainingOrder);
					}
				})
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		fetch(
			`https://genius-car-server-five-bice.vercel.app/orders?email=${user?.email}`,
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('genius-token')}`,
				},
			}
		)
			.then((res) => {
				if (res.status === 401 || res.status === 403) {
					return logout();
				}
				return res.json();
			})
			.then((data) => {
				setOrders(data);
			})
			.catch((err) => console.log(err));
	}, [user?.email]);

	return (
		<div>
			<h2 className='text-5xl'>You have {orders.length} Orders</h2>

			<div className='overflow-x-auto w-full'>
				<table className='table w-full'>
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th>
								<label>
									<input type='checkbox' className='checkbox' />
								</label>
							</th>
							<th>Name</th>
							<th>Job</th>
							<th>price</th>
							<th>address</th>
						</tr>
					</thead>
					<tbody>
						{/* <!-- row 1 --> */}

						{orders.map((order) => (
							<OrderRow
								key={order._id}
								handleDelete={handleDelete}
								order={order}
							/>
						))}
					</tbody>
					{/* <!-- foot --> */}
				</table>
			</div>
		</div>
	);
};

export default Orders;
