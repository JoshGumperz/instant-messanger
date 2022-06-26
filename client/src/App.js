import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import TestRoute from './components/TestRoute';
import './App.css';


function App() {
  return (
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/login'} component={Login}/>
        <ProtectedRoute exact path={"/protected"} component={TestRoute}/>
    </Switch>
  );
}

export default App;
