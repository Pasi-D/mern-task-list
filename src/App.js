import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getTasks } from './actions/taskActions';

import TaskList from './containers/task-list';

import Loader from 'react-loader-spinner'
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
        <Loader 
          type="Puff"
          color="#00BFFF"
          height="100"	
          width="100"
	      />  
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