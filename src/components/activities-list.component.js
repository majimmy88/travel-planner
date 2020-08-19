import React, { Component } from 'react';
import axios from 'axios';
import Activity from './activity-component'



export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            sortConfig: null,
        };
        this.deleteActivity = this.deleteActivity.bind(this)
        this.requestSort = this.requestSort.bind(this)
    };

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

    requestSort(key) {
        let direction = 'ascending';
        if (this.state.sortConfig && this.state.sortConfig.key === key && this.state.sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        this.setState({sortConfig:{ key, direction }})
        console.log(this.state.sortConfig)
        let sortedActivities = [...this.state.activities];
        if(this.state.sortConfig !== null) {
            sortedActivities.sort((a, b) => {
                if (a[this.state.sortConfig.key] < b[this.state.sortConfig.key]) {
                  return this.state.sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[this.state.sortConfig.key] > b[this.state.sortConfig.key]) {
                  return this.state.sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
              });
        }
        this.setState({activities:sortedActivities})
    }
    render() {
        return (
        <div>
            <h3>Logged Activities</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>
                            <button type="button"
                                onClick={() => this.requestSort('location')}
                            >
                                Location
                            </button>
                        </th>
                        <th>
                            <button type="button"
                                onClick={() => this.requestSort('description')}
                            >
                                Description
                            </button>
                        </th>
                        <th>
                            <button type="button"
                                onClick={() => this.requestSort('duration')}
                            >
                                Duration
                            </button>
                        </th>
                        <th>
                            <button type="button"
                                onClick={() => this.requestSort('date')}
                            >
                                Date
                            </button>
                        </th>
                        <th>
                            <button type="button"
                                onClick={() => this.requestSort('username')}
                            >
                                Username
                            </button>
                        </th>
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
};