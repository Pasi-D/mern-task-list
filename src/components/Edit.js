import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      task: {}
    };
  }

  componentDidMount() {
    
    axios.get('/api/task/'+this.props.match.params.id)
      .then(res => {
        this.setState({ task: res.data });
        console.log(this.state.task);        
      });
  }

  onChange = (e) => {
    const state = this.state.task
    state[e.target.name] = e.target.value;
    this.setState({task:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const { title, description, start_date, end_date } = this.state;
    
    axios.put('/api/task/'+this.props.match.params.id, { title, description, start_date, end_date })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT TASK
            </h3>
          </div>
          <div class="panel-body">            
            <h4><Link to={`/show/${this.state.task._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></Link></h4>
            <form onSubmit={this.onSubmit}>              
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.task.title} onChange={this.onChange} placeholder="Title" />
              </div>              
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.task.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="start_date">Start Date:</label>
                <input type="date" class="form-control" name="start_date" value={this.state.task.start_date} onChange={this.onChange} placeholder="Start Date" />
              </div>
              <div class="form-group">
                <label for="end_date">End Date:</label>
                <input type="date" class="form-control" name="end_date" value={this.state.task.end_date} onChange={this.onChange} placeholder="End Date" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
