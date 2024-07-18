const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: sessionStorage.getItem('jwtToken'),
			popularGames: [],
		},
		actions: {
			handleLogin: async (login, password) => {
				let response = await fetch(process.env.BACKEND_URL + 'login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: login,
						password: password,
						username: login
					}),
				})
				let data = await response.json()
				if (data) {
					sessionStorage.setItem('jwtToken', data.access_token);
					window.location.reload()
					return true;
				}
				else {
					throw new Error(data[0].error); // Throw error if unexpected response
				}
			},

			handleLogOut: () => {
				sessionStorage.removeItem("jwtToken");
				sessionStorage.removeItem("userInfo");
				setStore({ user: null });
				window.location.reload()
			},

			handleSignUp: async (username, email, password) => {
				fetch(process.env.BACKEND_URL + 'signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password,
						username: username
					}),
				})
					.then(response => {
						if (response.ok && response.status === 200) { // Check if response is successful and has status 200
							return response.json(); // Parse response body as JSON
						} else {
							throw new Error('Failed to sign up'); // Throw error if response is not successful
						}
					})
					.then(data => {
						// Check if a specific response is returned from the server
						if (data && data.success === true) {
							sessionStorage.setItem('jwtToken', data.access_token);
							window.location.reload();
						} else {
							throw new Error(data[0].error);
						}
					})
					.catch(error => {
						console.error('Error:', error);
					});
			},

			handleFetchUserInfo: async () => {
				const token = sessionStorage.getItem('jwtToken');
				if (!token) {
					return;
				}
				const response = await fetch(process.env.BACKEND_URL + 'protected', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					const data = await response.json();
					setStore({ user: data.user_info });
					sessionStorage.setItem('userInfo', JSON.stringify(data.user_info));
				} else {
					throw new Error('Failed to fetch user info');
				}
			},

			handleFetchPopularGames: async () => {
				const response = await fetch(process.env.BACKEND_URL + 'fetch_popular_games');
				if (response.ok) {
					const data = await response.json();
					setStore({ popularGames: data });
				} else {
					throw new Error('Failed to fetch popular games');
				}
			},

			handleSearch: async (searchTerm) => {
				const response = await fetch(process.env.BACKEND_URL + 'search', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						searchTerm: searchTerm
					})
				});
				if (response.ok) {
					const data = await response.json();
					console.log(data);
					setStore({ searchResults: data });
				} else {
					throw new Error('Failed to search for games');
				}
			},
		},
	};
};

export default getState;
