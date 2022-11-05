import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	const location = useLocation();

	if (loading) {
		return <div>Loging.....</div>;
	}

	if (user) {
		return children;
	}

	return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
