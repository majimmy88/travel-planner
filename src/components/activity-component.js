import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: {},
        }

    }
    render() {
        return (
            <tr>
                <td>{this.props.activity.location}</td>
                <td>{this.props.activity.description}</td>
                <td>{this.props.activity.duration}</td>
                <td>{this.props.activity.date.substring(0,10)}</td>
                <td>{this.props.activity.username}</td>
                <td>
                <Link to={"/edit/"+this.props.activity._id}>edit</Link> | <a href="#" onClick={() => { this.props.deleteActivity(this.props.activity._id) }}>delete</a>
                </td>
            </tr>
        )
    }
}