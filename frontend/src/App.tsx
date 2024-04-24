import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Student/Login/Login';
import Home from './pages/Student/Home/Home';
import Completed from './pages/Student/Assignments/Completed/Completed';
import Pending from './pages/Student/Assignments/Pending/Pending';
import Student from './pages/Student/StudentDetails/Student';
import Submission from './pages/Student/Submission/Submission';
import LecLogin from './pages/Lecturer/Login/Login';
import LecDashboard from './pages/Lecturer/Dashboard/Dashboard';
import AssignmentForm from './pages/Lecturer/AssignmentForm/AssignmentForm';
import AdLogin from './pages/Admin/Login/AdLogin';
import AdDashboard from './pages/Admin/Dashboard/Dashboard';
import Redirect from './pages/Redirect/Redirect';
import Lecturer from './pages/Lecturer/Lecturer/Lecturer';
import DisplaySubs from './pages/Lecturer/Submissions/DisplaySubs';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
	 <Route path='/' Component={Redirect}/>
     <Route path='/home' Component={Home}/>
	 <Route path="/assignments/completed" Component={Completed} />
     <Route path="/assignments/pending" Component={Pending} />
	 <Route path="/student" Component={Student} />
	 <Route path="/submission/:assignmentTitle" Component={Submission} />
     <Route path='/login' Component={Login}/>
	 <Route path='/lecturerLogin' Component={LecLogin}/>
	 <Route path='/lecturer' Component={Lecturer}/>
	 <Route path='/adminLogin' Component={AdLogin}/>
	 <Route path='/submissions/lecturer' Component={DisplaySubs}/>
	 <Route path='/adminDashboard' Component={AdDashboard}/>
	 <Route path='/assignments/create' Component={AssignmentForm}/>
	 <Route path='/lecturerDashboard' Component={LecDashboard}/>
		</Routes>
	</BrowserRouter>
);

export default App;
