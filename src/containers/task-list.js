import React, {Component } from 'react';
import { Link } from 'react-router-dom';

import { PropTypes } from 'prop-types';

import Switch from 'react-switch';

class TaskList extends Component{  
    
    constructor(){
        super();
        // Temporary state untill redux come to action
        this.state = {
            checked: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(checked){
        this.setState({ checked })
    }

    render(){
        return(
            <div>
                <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Add Tasks</Link></h4>              
                <table class="table table-stripe">                    
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th> {/*Toggle switch complete or incomplete*/}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map(task =>
                           <tr>
                               <td><Link to={`/show/${task._id}`}>{task.title}</Link></td>
                               <td>{task.description}</td>
                               <td>{this.state.checked ? 'Complete' : 'Incomplete'}</td>
                               <td>
                                    <Switch
                                        onChange={this.handleChange}
                                        checked={this.state.checked}
                                        id="normal-switch"
                                    />
                               </td>
                           </tr> 
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default TaskList;
