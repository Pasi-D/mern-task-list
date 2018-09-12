import React, {Component } from 'react';
import { Link } from 'react-router-dom';

import axios from "axios";

import { PropTypes } from 'prop-types';

class TaskDetails extends Component {
    
    delete(id) {
        console.log("deleting id: " + id);
        axios.delete("/api/task/" + id).then(result => {
          this.props.history.push("/");
        });
    }

    render(){
        return(
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">              
                        {this.props.task.title}
                    </h3>
                </div>
                <div class="panel-body">
                    <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Task List</Link></h4>
                    <dl>
                        <dt>Description</dt>
                        <dd>{this.props.task.description}</dd>
                        <dt>Start Date</dt>
                        <dd>{this.props.task.start_date}</dd>
                        <dt>End Date</dt>
                        <dd>{this.props.task.end_date}</dd>
                    </dl>
                    <Link to={`/edit/${this.props.task._id}`} class="btn btn-success">Edit</Link>&nbsp;     
                    <button onClick={this.delete.bind(this, this.props.task._id)} class="btn btn-danger">Delete</button>
                </div>
            </div>
        )
    }
}

TaskDetails.propTypes = {
    task: PropTypes.object.isRequired
}

export default TaskDetails;