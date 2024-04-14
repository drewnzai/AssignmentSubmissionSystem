import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Completed from './pages/Assignments/Completed/Completed';
import Pending from './pages/Assignments/Pending/Pending';
import Student from './pages/Student/Student';
import Submission from './components/Submission/Submission';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
     <Route path='/' Component={Home}/>
	 <Route path="/assignments/complete" Component={Completed} />
     <Route path="/assignments/pending" Component={Pending} />
	 <Route path="/student" Component={Student} />
	 <Route path="/submission/:assignmentName" Component={Submission} />
     <Route path='/login' Component={Login}/>
		</Routes>
	</BrowserRouter>
);

export default App;
