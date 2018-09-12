import React, {Component } from 'react';
import { Link } from 'react-router-dom';

import { PropTypes } from 'prop-types';

class TaskList extends Component{    
    render(){
        return(
        <table class="table table-stripe">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map(task =>
                           <tr>
                               <td><Link to={`/show/${task._id}`}>{task.title}</Link></td>
                               <td>{task.description}</td>
                           </tr> 
                        )}
                    </tbody>
        </table>)
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default TaskList;
