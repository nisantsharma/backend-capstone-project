import { Fragment, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


import JobList from './components/job/JobList';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import JobDetails from './components/job/JobDetails';
import AddJob from './components/job/AddJob';




const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = JSON.parse(localStorage.getItem('user'));


	if (isAuthenticated) {
		return (
			<>
				<Component {...rest} />
			</>
		)
	}
	else {
		return (
			<Navigate to='/login' />
		)
	}
}



function App() {
	const [job, setJob] = useState(null);


	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<JobList setJob={setJob} />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/jobdetails' element={<JobDetails job={job} />} />
					<Route path='/addjob' element={<ProtectedRoute component={AddJob} />} />
					<Route path='/editjob' element={<ProtectedRoute component={AddJob} job={job} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}



export default App;
