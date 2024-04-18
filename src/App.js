import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Display_Form from './components/Display_Form';
import Add_Category from './components/Add_Category';
import Question from './components/Question';
import EditQuestion from './components/EditQuestion';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />}>
          <Route path="/main" element={<Display_Form />} />
          <Route path="/main/addCategory" element={<Add_Category />} />
          <Route path="/main/addQuestion" element={<Question />} />
          <Route path="/main/editQuestion/:id" element={<EditQuestion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
