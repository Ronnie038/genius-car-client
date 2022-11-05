import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete }) => {
	const { _id, serviceName, service, price, customer, email, phone } = order;
	// console.log(_id);

	const [orderService, setOrderService] = useState({});

	useEffect(() => {
		fetch(`https://genius-car-server-five-bice.vercel.app/services/${service}`)
			.then((res) => res.json())
			.then((data) => setOrderService(data))
			.catch((err) => console.log(err));
	}, [service]);
	return (
		<tr>
			<th>
				<label>
					<button onClick={() => handleDelete(_id)} className='btn btn-ghost'>
						X
					</button>
				</label>
			</th>
			<td>
				<div className='flex items-center space-x-3'>
					<div className='avatar'>
						<div className='mask mask-squircle w-12 h-12'>
							{orderService?.img && (
								<img
									src={orderService.img}
									alt='Avatar Tailwind CSS Component'
								/>
							)}
						</div>
					</div>
					<div>
						<div className='font-bold'>{customer}</div>
						<div className='text-sm opacity-50'>{phone}</div>
					</div>
				</div>
			</td>
			<td>
				{serviceName}
				<br />
				<span className='badge badge-ghost badge-sm'>{_id}</span>
			</td>
			<td>{price}</td>
			<th>
				<button className='btn btn-ghost btn-xs'>{email}</button>
			</th>
		</tr>
	);
};

export default OrderRow;
