import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getTask } from "../actions/taskActions";

import Loader from 'react-loader-spinner'

import TaskDetails from "../containers/task-details";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {}
    };
  }

  componentDidMount() {
    console.log("params.id: " + this.props.match.params.id);

    this.props.getTask(this.props.match.params.id);
  }

  delete(id) {
    console.log("deleting id: " + id);
    axios.delete("/api/task/" + id).then(result => {
      this.props.history.push("/");
    });
  }

  rendertask() {
    if (this.props.task === null) {
      return (
        <Loader 
          type="Puff"
          color="#00BFFF"
          height="100"	
          width="100"
	      />
      );
    } else {
      return <TaskDetails task={this.props.task} />;
    }
  }

  render() {
      return <div class="container">{this.rendertask()}</div>;
  }
}

Show.propTypes = {
  getTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  task: state.tasks.task
});

export default connect(
  mapStateToProps,
  { getTask }
)(Show);
