import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const dateValidate = require('../validations/dates');
const taskEditValidatorInput = require('../validations/taskRegister');
const isEmpty = require('../validations/isEmpty');

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      task: {},
      errors: {},
      showButton: true
    };

    this.isDateValid = this.isDateValid.bind(this);
  }

  componentDidMount() {
    
    axios.get('/api/task/'+ this.props.match.params.id)
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

  isDateValid() {
    var valiDate = dateValidate(document.getElementById('start_date').value, document.getElementById('end_date').value)

    if (!valiDate) {
      this.setState({showButton: false})
    }else{
      this.setState({showButton: true})
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    var { title, description, start_date, end_date } = this.state.task;

    /* debugging */
    console.log('state on update : ' + ({ title, description, start_date, end_date }));

    /* Validate entries on submit */
    var { errors, isValid } = taskEditValidatorInput({ title, description, start_date, end_date });

    if (!isValid) {
      console.log('errors array : ' + JSON.stringify(errors));
      
      this.setState({errors: errors});
    }else{
      axios.put('/api/task/'+ this.props.match.params.id, { title, description, start_date, end_date })
      .then((result) => {
        
        this.props.history.push("/show/"+this.props.match.params.id);
      }).catch(err => console.log(err));
    }
        
    
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
                <input type="text" class="form-control" name="title" value={this.state.task.title} onChange={this.onChange} 
                placeholder={(isEmpty(this.state.errors) && isEmpty(this.state.errors.title)) ? 'Title' : 'Title cannot be empty'} required="true"/>
              </div>              
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.task.description} onChange={this.onChange} 
                placeholder={(isEmpty(this.state.errors) && isEmpty(this.state.errors.description)) ? 'Description' : 'Description cannot be empty'} required="true" />
              </div>
              <div class="form-group">
                <label for="start_date">Start Date:</label>
                <input id="start_date" type="date" class="form-control" name="start_date" value={this.state.task.start_date} onChange={this.onChange} placeholder="Start Date" />
              </div>
              <div class="form-group">
                <label for="end_date">End Date:</label>
                <input id="end_date" type="date" class="form-control" name="end_date" value={this.state.task.end_date} onChange={this.onChange} placeholder="End Date" onBlur={this.isDateValid} />
              </div>
              <p style={{visibility: this.state.showButton ? "hidden" : "visible", color: 'red'}}>Dates mismatch</p>
              <button style={{visibility: this.state.showButton ? "visible" : "hidden"}} type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
