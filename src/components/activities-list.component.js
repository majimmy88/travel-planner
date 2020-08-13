import React, { Component } from 'react';
import axios from 'axios';
import Activity from './activity-component'

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            currentSort: 'default',
            sortedField: null,
        };
        this.deleteActivity = this.deleteActivity.bind(this)
    };
    const { items, requestSort, sortConfig } = useSortableData(this.state.activities);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
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


    render() {
        return (
        <div>
            <h3>Logged Activities</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>
                            <button
                            type="button"
                            onClick={() => this.setState({ sortedField: 'location'})}
                            className={getClassNamesFor('location')}
                            >
                                Location
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => this.setState({ sortedField: 'description' })}>
                                Description
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => this.setState({ sortedField: 'duration' })}>
                                Duration
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => this.setState({ sortedField: 'date' })}>
                                Date
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => this.setState({ sortedField: 'username' })}>
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