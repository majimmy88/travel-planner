import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Router>
        <NavBar />
        <br/>
        <Route path="/" exact component ={ActivitiesList} />
        <Route path="/edit/:id" component={EditActivity} />
        <Route path="/create" component={CreateActivty} />
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
