import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import TestRoute from './components/TestRoute/TestRoute';
import './App.css';


function App() {
  return (
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/login'} component={Login}/>
    </Switch>
  );
}

export default App;
