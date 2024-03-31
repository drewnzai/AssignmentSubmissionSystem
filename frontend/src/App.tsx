import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/ui/Header/Header";
import Login from "./components/Login/Login";

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" Component={() => {
        return(
          <>
          <div className="imageFill">
          <div className="egerton">
          <Header/>
        
          <Login/>
        
          </div>
          </div>
          </>
        );
      }} />
		</Routes>
	</BrowserRouter>
);

export default App;
