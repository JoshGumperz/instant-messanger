import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Signup from './pages/Signup/Signup'
import { loggedIn } from './utils/auth';
import Settings from './pages/Settings/Settings';
import './App.css';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  const setLoggedIn = (logged) => {
    setUserLoggedIn(logged)
  }

  useEffect(() => {
    setUserLoggedIn(loggedIn())
  }, [userLoggedIn])

  return (
    <div className='app-main'>
      <div className='app-background'></div>
      <Navbar setLoggedIn={setLoggedIn} userLoggedIn={userLoggedIn}/>
      <Switch>
          <Route exact path={'/'}>
            { userLoggedIn ? <Home setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn}/>}
          </Route>
          <Route exact path={'/settings'}>
            { userLoggedIn ? <Settings setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn}/>}
          </Route>
          <Route exact path={'/login'}>
            { !userLoggedIn ? <Login setLoggedIn={setLoggedIn}/> : <Home setLoggedIn={setLoggedIn}/>}
          </Route>
          <Route exact path={'/signup'}>
            { !userLoggedIn ? <Signup setLoggedIn={setLoggedIn}/> : <Home setLoggedIn={setLoggedIn}/>}
          </Route>
      </Switch>
    </div>
  );
}

export default App;
