import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard';
import Students from './pages/Admin/Students';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {ColorModeContext, useMode} from './theme';
import Forms from './pages/Admin/Forms';
import FAQ from './pages/Admin/FAQ';
import Login from "./pages/Login.tsx";
import AdminProtectedRoutes from './auth/Routes/AdminProtectedRoutes.tsx';
import Redirect from './pages/Redirect.tsx';
import LecturerProtectedRoutes from './auth/Routes/LecturerProtectedRoutes.tsx';
import LecturerDashboard from './pages/Lecturer/Dashboard.tsx';
import LecturerFAQ from './pages/Lecturer/FAQ.tsx';
import LecturerForms from './pages/Lecturer/Forms.tsx';
import Assignments from './pages/Lecturer/Assignments.tsx';
import SubmissionsFromAssignment from './pages/Lecturer/SubmissionsFromAssignment.tsx';
import Submissions from './pages/Lecturer/Submissions.tsx';
import StudentProtectedRoutes from './auth/Routes/StudentProtectedRoutes.tsx';
import StudentDashboard from './pages/Student/Dashboard.tsx';
import PendingFromUnit from './pages/Student/PendingFromUnit.tsx';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
    {/* @ts-ignore */}
    <ColorModeContext.Provider value={colorMode}>
    {/* @ts-ignore */}
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <BrowserRouter>
    <Routes>
      
      <Route element={<AdminProtectedRoutes/>}>
      <Route path='/admin/home' element={<Dashboard/>}/>
      <Route path='/admin/students' element={<Students/>}/>
      <Route path='/admin/forms' element={<Forms/>}/>
      <Route path='/admin/faq' element={<FAQ/>}/>
      </Route>
      
      <Route element={<LecturerProtectedRoutes/>}>
      <Route path='/lecturer/home' element={<LecturerDashboard/>}/>
      <Route path='/lecturer/submissions' element={<Submissions/>}/>
      <Route path='/lecturer/forms' element={<LecturerForms/>}/>
      <Route path='/lecturer/faq' element={<LecturerFAQ/>}/>
      <Route path='/lecturer/assignments/:code' element={<Assignments/>}/>
      <Route path='/lecturer/assignment/:title/submissions' element={<SubmissionsFromAssignment/>}/>
      </Route>

      <Route element={<StudentProtectedRoutes/>}>
      <Route path='/student/home' element={<StudentDashboard/>}/>
      <Route path='/student/assignments/:code' element={<PendingFromUnit/>}/>
      </Route>

    <Route path='/' element={<Redirect/>}/>
    <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </ThemeProvider>
    </ColorModeContext.Provider>
   
    
    </>
  );
}

export default App
