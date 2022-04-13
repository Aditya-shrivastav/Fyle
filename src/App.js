import './App.css';
import React, { useEffect, useState } from 'react'
import SearchUser from './components/SearchUser/searchUser';
import UserDetails from './components/User/user';
import Repostiories from './components/Repositories/repository';
import ReactPaginate from 'react-paginate';
import { Container, Spinner } from 'reactstrap';
import axios from 'axios';

function App() {

	const [username, setUsername] = useState(null);
	const [user, setUser] = useState(null);
	const [repos, setRepos] = useState(null);
	const [currPage, setCurrPage] = useState(1);
	const [repoErr, setRepoErr] = useState(null);
	const [err, setErr] = useState(null);


	useEffect(() => {
		if (username != null) {
			getUser()
		}
	}, [username, currPage])

	const getUsername = (name) => {
		setUsername(name);
		console.log(name)
		console.log(username)
	}

	const getUser = async () => {
		try {
			setErr(null);
			setRepoErr(null);
			if (user && user.login.toLowerCase() !== username.toLowerCase())
				setCurrPage(1);

			const userData = await axios.get(`https://api.github.com/users/${username}`);
			if (userData) {
				setUser(userData.data);
				getRepos()
			}
			else {
				setErr('No User Found!');
				setCurrPage(1);
				setRepos([]);
				setUser(null);
				setRepoErr('');

			}
		} catch (err) {
			setErr(err.message);
			setCurrPage(1);
			setRepos([]);
			setUser(null);
			setRepoErr('');
			console.log(err);
		}
	}


	const getRepos = async () => {
		try {
			setErr(null);
			setRepoErr(null);
			const repos = await axios.get(`https://api.github.com/users/${username}/repos`, { params: { page: currPage, per_page: 6 } });
			if (repos) {
				setRepos(repos.data)
			}
			else {
				setRepoErr('No Repository found!')
				setCurrPage(1);
				setRepos([]);
				setUser(null);
				setErr('');
			}

		} catch (err) {
			setRepoErr(err.message);
			setCurrPage(1);
			setRepos([]);
			setUser(null);
			setErr('');
			console.log(err);
		}
	}

	const handlePageClick = (data) => {
		setCurrPage(data.selected + 1);
	}

	return (
		<div className="App">
			<SearchUser getUser={getUsername} />
			{
				username ?
					<Container style={{ border: '1px solid black', padding: '2em' }}>
						{
							username ?
								user && user.login.toLowerCase() === username.toLowerCase() ?
									<UserDetails user={user} />
									:
									err || repoErr ?
										<div>{err}</div>
										:
										<div style={{ display: 'flex', justifyContent: 'center', padding: '2em' }}>
											<Spinner style={{ width: '2rem', height: '2rem' }}
												children={false} />
										</div>
								:
								null
						}
						{
							username ?
								repos && user && user.login.toLowerCase() === username.toLowerCase() ?
									<>
										<Repostiories repos={repos} />
										<div id="pagination">
											<ReactPaginate
												previousLabel={'<<'}
												nextLabel={'>>'}
												breakLabel={'...'}
												breakClassName={'break-me'}
												pageCount={Math.ceil(user.public_repos / 6)}
												onPageChange={handlePageClick}
												containerClassName={'pagination'}
												activeClassName={'active'}
											/>
										</div>
									</>
									:
									err || repoErr ?
										<div>{repoErr}</div>
										:
										<div style={{ display: 'flex', justifyContent: 'center', padding: '2em' }}>
											<Spinner style={{ width: '2rem', height: '2rem' }}
												children={false} />
										</div>
								:
								null
						}
					</Container>
					:
					<div></div>
			}
		</div>
	);
}

export default App;
