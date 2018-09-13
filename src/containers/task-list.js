import React, {Component } from 'react';
import { Link } from 'react-router-dom';

import { PropTypes } from 'prop-types';

import Switch from 'react-switch';

import axios from 'axios';

class TaskList extends Component{  
    
    constructor(){
        super();
        // Temporary state untill redux come to action
        this.state = {
            //this state is an array of objects with each object : [task._id : checked_status]
            checks: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(checked, e, id){
        let cstate = this.state.checks;

        cstate[id] = checked;

        axios.put('/api/task/'+id, { status: checked })
            .then((result) => {
                this.setState({ checks: cstate });
            }).catch(err => console.log(err));
        
        console.log('component state : ' + JSON.stringify(this.state.checks));
                
    }

    componentDidMount(){
        //Mount the component's state.checks with [task._id: task.status]

        let bstate = this.state.checks;
        this.props.tasks.map(task => {
            bstate[task._id] = task.status
        });
        this.setState({ checks: bstate });

        console.log('componentMount state :' + JSON.stringify(this.state.checks));
        
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
                               <td>{this.state.checks[task._id] ? 'Complete' : 'Incomplete'}</td>
                               <td>
                                    <Switch
                                        onChange={this.handleChange}
                                        checked={this.state.checks[task._id]}
                                        id={task._id}
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
