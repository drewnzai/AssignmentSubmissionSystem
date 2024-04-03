import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
     <Route path='/' Component={Home}/>
     <Route path='/login' Component={Login}/>
		</Routes>
	</BrowserRouter>
);

export default App;
