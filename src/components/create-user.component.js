import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeSavedUsername = this.onChangeSavedUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      username: '',
      savedUsername: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data
          })
          console.log(this.state.users)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeSavedUsername(e){
    console.log(e.target.value)
    this.setState({
      savedUsername:e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:5500/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  deleteUser(e) {
    // e.preventDefault();
    let user_id = ''
    this.state.users.forEach((el) => {
      if(el.username === this.state.savedUsername){
        user_id = el._id
      }
    })
    axios.delete('http://localhost:5500/users/'+user_id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== user_id)
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>

        <h3>Delete User</h3>
        <form onSubmit={this.deleteUser}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.savedUsername}
              onChange={this.onChangeSavedUsername}>
              {
                this.state.users.map(function(user) {
                  return <option
                    key={user.username}
                    value={user.username}>{user.username}
                    </option>;
                })
              }
          </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Delete User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}