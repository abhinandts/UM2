
import { BrowserRouter, Routes, Route } from 'react-router'

import UserAuth from './components/user/UserAuth';
import Home from './components/Home';

import AdminAuth from './components/admin/AdminAuth';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/PrivateComponent';

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/userAuth' element={<UserAuth />} />

      </Routes>

    </ BrowserRouter>
  )
}

export default App;




{/* <Route path='/adminAuth' element={<AdminAuth />} />
<Route path='/dashboard' element={<Dashboard />} /> */}



// "http://localhost:5000/api/user/register"

// "http://localhost:5000/api/user/login"