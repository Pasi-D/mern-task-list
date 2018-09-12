import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getTasks } from './actions/taskActions';

import TaskList from './containers/task-list';

class App extends Component {

  constructor(props) {
    super(props);    
  }

  componentDidMount() {  
    this.props.getTasks();      
  }

  renderTasks(){
    const {tasks} = this.props.tasks
    if (tasks === null) {
      return (
        <div>
          <h2>Loading ....</h2>
        </div>
      )
    }else{
      return <TaskList tasks={tasks} />
    }
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
            {this.renderTasks()}
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  tasks: state.tasks
})

//export default App;
export default connect(mapStateToProps, { getTasks })(App);