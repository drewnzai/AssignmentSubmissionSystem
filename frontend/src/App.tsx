import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
     <Route path='/' Component={Login}/>
		</Routes>
	</BrowserRouter>
);

export default App;
