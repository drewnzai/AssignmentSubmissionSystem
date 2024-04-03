import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Completed from './components/Assignments/Completed/Completed';
import Pending from './components/Assignments/Pending/Pending';
import Student from './components/Student/Student';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
     <Route path='/' Component={Home}/>
	 <Route path="/assignments/complete" Component={Completed} />
     <Route path="/assignments/pending" Component={Pending} />
	 <Route path="/student" Component={Student} />
     <Route path='/login' Component={Login}/>
		</Routes>
	</BrowserRouter>
);

export default App;
