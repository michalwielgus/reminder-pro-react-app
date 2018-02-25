import React, { Component } from 'react';
import '../styles/style.css';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/';
import moment from 'moment';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    renderReminders() {
        const { reminders } = this.props;

        return (
            <ul className="list list-group">
                {
                    reminders.map((reminder) => {
                                    return(
                                        <li key={reminder.id} className="list-group-item reminder">
                                            <div>{ reminder.text }</div>
                                            <div>{ moment(new Date(reminder.dueDate)).fromNow() }</div>
                                            <div className="delete-item" onClick={ () => this.deleteReminder(reminder.id) }>
                                                &#x2716;
                                            </div>
                                        </li>
                                        )
                                    }
                                 )
                }
            </ul>
        )
    }
    render() {
        return(
            <div className ="app text-center">
                <h1 className="title">ReminderPRO</h1>
                <div className="form-inline">
                    <div className="form-group form-center">
                        <input className="form-control form-margin" type="text" placeholder="I have to ..."
                               onChange= { event => this.setState({text: event.target.value}) }
                        />
                        <input className="form-control form-margin" type="text" placeholder="I have to ..."
                               type="datetime-local"
                               onChange= { event => this.setState({dueDate: event.target.value}) }
                        />
                        <button className="btn btn-success form-margin" onClick={ () => this.addReminder() }>
                            Add to memory
                        </button>
                    </div>
                    <div className="reminders">
                        { this.renderReminders() }
                    </div>
                    <div className="btn btn-danger" onClick={ () => this.props.clearReminders() }>Clear all reminders</div>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App)
