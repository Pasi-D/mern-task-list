import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      tasks: []
    };
  }

  componentDidMount() {    
    axios.get('/api/task')
      .then(res => {
        this.setState({ tasks: res.data });
        console.log(this.state.tasks);        
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Task List
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Tasks</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>                  
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>                
                {this.state.tasks.map(task => 
                  <tr>
                    <td><Link to={`/show/${task._id}`}>{task.title}</Link></td>
                    <td>{task.description}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
