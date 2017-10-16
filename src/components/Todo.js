import React, { Component } from 'react';
import '../css/Todo.css';

class Todo extends Component {

	constructor (props) {
		super(props);
		
		this.state = {
			editMode: false,
			editingValue: ''
		}
	}

	handleChange = (event) => {
		// bind input
		this.setState({editingValue: event.target.value});
	}

	handleSubmit = (event) => {
		// prevent page refresh
	    event.preventDefault();
	    // store copy of states
	    let newValue = this.state.editingValue;
	    let editMode = this.state.editMode;

	    if (newValue) {
	    this.props.updateTodo(newValue);
		editMode = !editMode;
		} else {
			editMode = !editMode;
		}
		// update state
	    this.setState({
	      editMode,
	      editingValue: ''
	    })
  	}

	toggleEdit = () => {
		// store copy of state
		let editMode = this.state.editMode;
		editMode = !editMode;

		// update state
		this.setState({ editMode })
	}

	render () {
		const {todo} = this.props;

		
		if (!this.state.editMode) {
			return (
				<div className="row todo-item">
				<div className="col-10">
				<p className="desc" onClick={this.toggleEdit}>{todo.desc}</p>
				</div>
				<div className="col-2 button-group">
				<i onClick={this.props.deleteTodo} className="fa fa-trash" aria-hidden="true"></i>
				<i onClick={this.props.toggleCompleted} className="fa fa-check" aria-hidden="true"></i>
				</div>
				</div>
			)
		} else {
			return (
				<div className="row todo-item">
				<form className="editing-form" onSubmit={(e) => {this.handleSubmit(e)}}>
				<input className="form-control editing-input" onChange={this.handleChange} type="text"/>
				</form>
				</div>
			)
		}
	}
}

export default Todo;