import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { AuthProvider } from "./components/context/AuthContext";
import "./App.css";
import Overview from "./components/Overview";
import GuestsList from "./components/GuestsList";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/dashboard/overview" exact component={Overview} />
            <Route path="/dashboard/guests" exact component={GuestsList} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
