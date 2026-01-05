import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sessions from "./pages/Sessions";
import Prepare from './pages/Prepare' ; 
import Questions from './pages/Questions' ;
import StartPage from './pages/StartPage' ;

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {  <StartPage/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/sessions" element={<ProtectedRoute><Sessions /></ProtectedRoute>} />
        <Route path="/prepare" element={<ProtectedRoute><Prepare /></ProtectedRoute>} />
        <Route path="/sessions/:id" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
