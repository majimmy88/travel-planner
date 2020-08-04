import React, { Component } from 'react';
import axios from 'axios';
import Activity from './activity-component'

export default class ActivitiesList extends Component {
  constructor(props) {
    super(props);

    this.state = {activities: []};

    this.deleteActivity = this.deleteActivity.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:5500/activities/')
      .then(response => {
        this.setState({ activities: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteActivity(id) {
    axios.delete('http://localhost:5500/activities/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.activities.filter(el => el._id !== id)
    })
  }

  activityList() {
    return this.state.activities.map(currentactivity => {
      return <Activity activity={currentactivity} deleteActivity={this.deleteActivity} key={currentactivity._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Activities</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Location</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.activityList() }
          </tbody>
        </table>
      </div>
    )
  }
}