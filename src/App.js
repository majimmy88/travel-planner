import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import ActivitiesList from "./components/activities-list.component";
import EditActivity from "./components/edit-activity.component";
import CreateActivty from "./components/create-activity.component";
import CreateUser from "./components/create-user.component";
// import Map from "./components/map.component";
import SearchBox from "./components/search-box.component";

function App() {
  return (
    <Router>
        <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component ={ActivitiesList} />
          <Route path="/edit/:id" component={EditActivity} />
          <Route path="/create" component={CreateActivty} />
          <Route path="/user" component={CreateUser} />
          <Route path="/searchbox" component={SearchBox} />
        </div>
    </Router>
  );
}

export default App;
