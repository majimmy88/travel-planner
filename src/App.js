import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import ActivitiesList from "./components/activities-list.component";
// import EditActivity from "./components/edit-activity.component";
// import CreateActivty from "./components/create-activity.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
        <NavBar />
        <br/>
        <Route path="/" exact component ={ActivitiesList} />
        {/* <Route path="/edit/:id" component={EditActivity} /> */}
        {/* <Route path="/create" component={CreateActivty} /> */}
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
