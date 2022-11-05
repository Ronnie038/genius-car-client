export const setAuthToken = (user, navigate, from) => {
	const curUser = {
		email: user.email || user.uid,
	};
	// form.reset();

	fetch(`https://genius-car-server-five-bice.vercel.app/jwt`, {
		method: 'post',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(curUser),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			// local storage is the easy to set but not the best way
			localStorage.setItem('genius-token', data.token);
			navigate(from, { replace: true });
		})
		.catch((err) => console.log(err));
};
