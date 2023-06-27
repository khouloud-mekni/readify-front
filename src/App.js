import './App.css';
import {Routes, Route} from 'react-router-dom'
import PublicLayout from './components/Layout/PublicLayout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import VerifyEmail from './components/Verify/VerifyEmail';
import VerifyEmailAuthor from './components/Verify/VerifyEmailAuthor';
import Book from './components/Book/Book';
import PrivateRoute from './components/Routes/PrivateRoute';
import AuthRoute from './components/Routes/AuthRoute';
import LoginAdmin from './components/Admin/LoginAdmin';
import AdminLayout from './components/Layout/AdminLayout';
import UserProfile from "./components/user/UserProfile";
import UserRoute from "./components/Routes/UserRoute.jsx";
import AuthorRoute from "./components/Routes/AuthorRoute.jsx";
import AuthorProfile from "./components/author/AuthorProfile";
import BooksCollection from './components/author/BooksCollection';
import AdminDashboard from './components/Admin/AdminDashbord';
import AdminUsers from './components/Admin/AdminUsers';
import AdminAuthors from './components/Admin/AdminAuthors';

function App() {
  return (
    <Routes>
    <Route path='/' element={<PublicLayout/>}>
        <Route index element={<Home/>}/>
        <Route  path='login' element={ 
            <AuthRoute>
             <Login />
            </AuthRoute>}/>

        <Route  path='register' element={
          <AuthRoute>
            <Register />
          </AuthRoute>}/>

        
        <Route  path="book/:id" element={
          <PrivateRoute>
            <Book/>
          </PrivateRoute>
          }/>

          <Route
          path="user-profile"
          element={
            <UserRoute>
              <UserProfile />
            </UserRoute>
          }
        />
        <Route
          path="author-profile"
          element={
            <AuthorRoute>
              <AuthorProfile />
            </AuthorRoute>
          }
        />
        <Route
          path="myBooks"
          element={
            <AuthorRoute>
              <BooksCollection />
            </AuthorRoute>
          }
        />
    </Route>
    <Route path="/verify-email-user" element={<VerifyEmail />} />
    <Route path="/verify-email-author" element={<VerifyEmailAuthor />} />
    {/* Admin Routes */}
    <Route path="/admin/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard/>}/>
        <Route path="users" element={<AdminUsers  />} />
        <Route path="authors" element={<AdminAuthors/>} />
      </Route>
    <Route  path='/admin/login' element={<LoginAdmin/>}/>
    
    </Routes>
  );
}

export default App;
