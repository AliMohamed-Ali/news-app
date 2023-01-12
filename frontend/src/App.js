import { BrowserRouter as Router,Navigate,Route,Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sources from "./pages/Sources";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {user} = useAuthContext();
  return (
    <Router>
      <Navbar/>
      <ToastContainer autoClose={1000}/>
      <Routes>
        <Route path="/" element={user?<Home/>:<Navigate to='/login'/>}/>
        <Route path="/sources" element={user?<Sources/>:<Navigate to='/login'/>}/>
        <Route path="/login" element={!user?<Login/>:<Navigate to='/'/>}/>
        <Route path="/signup" element={!user?<Signup/>:<Navigate to='/'/>}/>
      </Routes>
    </Router>
  );
}

export default App;
