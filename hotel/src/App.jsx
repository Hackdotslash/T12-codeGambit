import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import { AuthProvider } from "./components/context/AuthContext";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
