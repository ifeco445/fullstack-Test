import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './main/Home';
import Navbar from './main/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import FriendList from './components/FriendsList';
import UsersList from './components/UsersList';


function App() {
  return (
    <AuthProvider>
      <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="/dashboard" element={<ProtectedRoute element={
            <Dashboard /> } />} />
            <Route path="/create" element={<ProtectedRoute element={
            <PostForm /> } />} />
             <Route path="/friends" element={<ProtectedRoute element={
            <FriendList /> } />} />
            <Route path="/usersId" element={<ProtectedRoute element={
            <UsersList /> } />} />
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
