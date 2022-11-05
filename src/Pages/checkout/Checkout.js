import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
	const { _id, title, price } = useLoaderData();
	console.log(_id);

	const { user } = useContext(AuthContext);

	const handlePlaceOrder = (e) => {
		e.preventDefault();
		const form = e.target;
		const name = `${form.firstName.value} ${form.lastName.value}`;
		const email = user?.email || 'unregisterd';
		const phone = form.phone.value;
		const message = form.message.value;

		const order = {
			service: _id,
			serviceName: title,
			price,
			customer: name,
			email,
			phone,
			message,
		};

		if (phone.length > 10) {
			alert('phone should be charecter longer');
		}

		fetch('https://genius-car-server-five-bice.vercel.app/orders', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${localStorage.getItem('genius-token')}`,
			},
			body: JSON.stringify(order),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					alert('order palced successfully');
					form.reset();
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className=' mx-auto my-5 p-5'>
			<form onSubmit={handlePlaceOrder}>
				<h2 className=' text-4xl'>You are about to order: {title}</h2>
				<h2 className=' text-3xl'>{price}</h2>
				<div className='grid  gap-4'>
					<input
						name='firstName'
						required
						type='text'
						placeholder='First Name'
						className='input col-span-6 input-ghost w-full  input-bordered'
					/>
					<input
						name='lastName'
						required
						type='text'
						placeholder='Last Name'
						className='input col-span-6 input-ghost w-full  input-bordered'
					/>
					<input
						name='phone'
						required
						type='text'
						placeholder='Your phone'
						className='input col-span-12 input-ghost w-full input-bordered'
					/>
					<input
						name='email'
						type='text'
						placeholder='Your email'
						className='input col-span-12 input-ghost w-full input-bordered '
						defaultValue={user?.email}
						readOnly
					/>
				</div>
				<textarea
					className='textarea my-2 textarea-bordered h-24 bg-inherit w-full'
					placeholder='Your massage'
					name='message'
				></textarea>
				<button className='btn' type='submit'>
					place your order
				</button>
			</form>
		</div>
	);
};

export default Checkout;
