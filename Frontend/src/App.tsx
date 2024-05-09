import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard';
import Students from './pages/Admin/Students';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Forms from './pages/Admin/Forms';
import FAQ from './pages/Admin/FAQ';

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
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/students' element={<Students/>}/>
      <Route path='/forms' element={<Forms/>}/>
      <Route path='/faq' element={<FAQ/>}/>
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </ColorModeContext.Provider>
   
    
    </>
  );
}

export default App
