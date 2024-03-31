import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from "antd";
import './App.css';
import Header from "./components/ui/Header/Header";
import Login from "./components/Login/Login";

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" Component={() => {
        return(
          <>
          <Header/>
          <Layout.Content>
            <Login/>
          </Layout.Content>
          </>
        );
      }} />
		</Routes>
	</BrowserRouter>
);

export default App;
