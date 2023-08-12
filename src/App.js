import React from "react";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";

import './App.css'
import Navbar from "./components/navbar/Navbar";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import { AuthContextProvider, UserAuth } from "./utils/context/AuthContext";
import { AppContextProvider} from './utils/context/AppContext';
import { ErrorBoundary } from "./components/ErrorBoundary";
import CardsList from "./components/CardsList"; // Move the import here

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          <AppContextProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<CardsList />} />
            </Route>
          </Routes>
          </AppContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

const ProtectedLayout = () => {
  const { user } = UserAuth(); 

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
