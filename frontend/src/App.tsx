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
import LecturerPage from './pages/Lecturer/Lecturer/LecturerPage';
import DisplaySubs from './pages/Lecturer/Submissions/DisplaySubs';
import ModifySub from './pages/Lecturer/ModifySub/ModifySub';
import DeleteAssignment from './pages/Lecturer/DeleteAssignment/DeleteAssignment';
import LecAssignments from './pages/Lecturer/Assignments/LecAssignments';
import StudentManagement from './pages/Admin/StudentManagement/StudentManagement';
import LecturerManagement from './pages/Admin/LecturerManagement/LecturerManagement';
import UnitManagement from './pages/Admin/UnitManagement/UnitManagement';

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
	 <Route path='/assignments/delete' Component={DeleteAssignment}/>
	 <Route path='/lecturer' Component={LecturerPage}/>
	 <Route path='/modify/:assignmentTitle' Component={ModifySub}/>
	 <Route path='/adminLogin' Component={AdLogin}/>
	 <Route path='admin/student-management' Component={StudentManagement}/>
	 <Route path='admin/lecturer-management' Component={LecturerManagement}/>
	 <Route path='admin/unit-management' Component={UnitManagement}/>
	 <Route path='/assignments/lecturer' Component={LecAssignments}/>
	 <Route path='/submissions/lecturer' Component={DisplaySubs}/>
	 <Route path='/adminDashboard' Component={AdDashboard}/>
	 <Route path='/assignments/create' Component={AssignmentForm}/>
	 <Route path='/lecturerDashboard' Component={LecDashboard}/>
		</Routes>
	</BrowserRouter>
);

export default App;
