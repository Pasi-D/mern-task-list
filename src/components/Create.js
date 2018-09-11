import taskRegisterValidatorInput from '../validations/taskRegister';
import dateValidator from '../validations/dates';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const isEmpty = require('../validations/isEmpty');
class Create extends Component {

  constructor() {
    super();
    this.state = {      
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      errors: {},
      date_valid: true
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const { title, description, start_date, end_date } = this.state;
    
    //Validate before submitting
    var { errors, isValid } = taskRegisterValidatorInput({ title, description, start_date, end_date });

    var dateValidated = dateValidator(start_date, end_date);
    //update date_valid state
    this.setState({date_valid: dateValidated});

    console.log('dates are validated : ' + this.state.date_valid);    

    if (!isValid) {
      console.log('errors array : ' + JSON.stringify(errors));
      
      //bind errors to state.errors
      this.setState({errors: errors})

    }else {      
      axios.post('/api/task', { title, description, start_date, end_date })
      .then((result) => {
          this.props.history.push("/")
      });
    }    
  }

  render() {    
    const { title, description, start_date, end_date } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Create Task
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Task List</Link></h4>
            <form onSubmit={this.onSubmit}>              
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} 
                placeholder={(isEmpty(this.state.errors) && isEmpty(this.state.errors.title)) ? 'Title' : 'Title cannot be empty'} />
              </div>              
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} 
                placeholder={(isEmpty(this.state.errors) && isEmpty(this.state.errors.description)) ? 'Description' : 'Description cannot be empty'} cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">                
                <label for="start_date">start Date:</label>
                <input type="date" class="form-control" name="start_date" value={start_date} onChange={this.onChange} placeholder="Start Date" />
              </div>
              <div class="form-group">                
                <label for="end_date">end Date:</label>
                <input type="date" class="form-control" name="end_date" value={end_date} onChange={this.onChange} placeholder="End Date" />
              </div>              
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
