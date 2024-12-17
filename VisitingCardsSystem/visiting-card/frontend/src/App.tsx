import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.tsx';
import SignUp from './components/SignUp/SignUp.tsx';
import Login from './components/Login/Login.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import UpdateForm from './components/UpdateForm.tsx';

const App = () => {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />  
          <Route path="/signup" element={<SignUp />} />  
          <Route path='/login' element={<Login />} />
         <Route path='/dashboard' element={<Dashboard />} />
         <Route path='/:id/update' element={<UpdateForm />}/>
        </Routes>
      </Router>

  );
}

export default App;
