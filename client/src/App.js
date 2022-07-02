import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Signup from './pages/Signup/Signup'
import { loggedIn } from './utils/auth';
import TestRoute from './components/TestRoute/TestRoute';
import Settings from './pages/Settings/Settings';
import UnprotectedRoute from './components/UnprotectedRoute/UnprotectedRoute'
import './App.css';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  const setLoggedIn = (logged) => {
    setUserLoggedIn(logged)
  }

  useEffect(() => {
    setUserLoggedIn(loggedIn())
  }, [])

  return (
    <div className='app-main'>
      <div className='app-background'></div>
      <Navbar userLoggedIn={userLoggedIn}/>
      <Switch>
          <ProtectedRoute exact path="/" userLoggedIn={userLoggedIn} setUserLoggedIn={setLoggedIn} component={Home}/>
          <ProtectedRoute exact path="/settings" userLoggedIn={userLoggedIn} setUserLoggedIn={setLoggedIn} component={Settings}/>
          <UnprotectedRoute exact path={'/login'} userLoggedIn={userLoggedIn} setUserLoggedIn={setLoggedIn} component={Login}/>
          <UnprotectedRoute exact path={'/signup'} userLoggedIn={userLoggedIn} setUserLoggedIn={setLoggedIn} component={Signup}/>
      </Switch>
    </div>
  );
}

export default App;
