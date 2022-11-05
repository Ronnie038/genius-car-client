import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { setAuthToken } from '../../../serveices/api/auth';

const SocialLogin = () => {
	const { googleSignIn } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/';

	const loginWithGoggle = () => {
		googleSignIn()
			.then((result) => {
				const user = result.user;
				console.log(user);
				setAuthToken(user, navigate, from);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<p className='text-center'>
				<small>Social Login</small>
			</p>
			<p className='text-center'>
				<button onClick={loginWithGoggle} className=' btn btn-ghost'>
					Google
				</button>
			</p>
		</div>
	);
};

export default SocialLogin;
