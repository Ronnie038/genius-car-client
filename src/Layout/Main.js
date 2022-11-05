import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';

const Main = () => {
	return (
		<div className='flex justify-between flex-col min-h-screen '>
			<Header></Header>
			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
};

export default Main;
