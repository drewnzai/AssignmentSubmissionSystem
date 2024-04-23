import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Student/Login/Login';
import Home from './pages/Student/Home/Home';
import Completed from './pages/Assignments/Completed/Completed';
import Pending from './pages/Assignments/Pending/Pending';
import Student from './pages/Student/StudentDetails/Student';
import Submission from './pages/Student/Submission/Submission';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
     <Route path='/' Component={Home}/>
	 <Route path="/assignments/completed" Component={Completed} />
     <Route path="/assignments/pending" Component={Pending} />
	 <Route path="/student" Component={Student} />
	 <Route path="/submission/:assignmentTitle" Component={Submission} />
     <Route path='/login' Component={Login}/>
		</Routes>
	</BrowserRouter>
);

export default App;
