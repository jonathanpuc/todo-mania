import React, { Component } from 'react';
import '../css/App.css';
import Todo from './Todo';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      inputValue: '',
      filtered: {},
      filterStatus: 'active'
    }
  }

  componentWillMount() {
    let todos = localStorage.getItem('todos');
    
    todos = JSON.parse(todos);

      // update state
      this.setState({
        todos
      }, () => {
        this.updateFilters();
      });
  }

  updateLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));    
  };

  handleChange = (event) => {
    // bind input 
    this.setState({inputValue: event.target.value});
  };

  handleSubmit = (event) => {
    // prevent page refresh
    event.preventDefault();
    // take copy of todos in stage
    let todosCopy = {...this.state.todos};
    // user has entered valid todo
    if (this.state.inputValue !== '') {
      // create a todo object
      let todo = {desc: this.state.inputValue, completed: false};
      // timestamp for unique key
      const timestamp = Date.now();
      // add created todo item to todos 
      todosCopy[`todo-${timestamp}`] = todo;
      // update state
      this.setState({
        todos: todosCopy,
        inputValue: '',
        filter: 'active'
      }, () => {
        this.updateLocalStorage();
        this.updateFilters();
      });
    }
  };

  deleteTodo = (key) => {
    // take copy of todos in state
    let todosCopy = {...this.state.todos};
    // delete the todo
    delete todosCopy[key]; 
    // update state
    this.setState({
      todos: todosCopy
    }, () => {
      this.updateLocalStorage();
      this.updateFilters();
    })
  };

  updateTodo = (key, editedValue) => {
    // take copy of todos in state
    let todosCopy = {...this.state.todos};
    // update description of todo to new value
    todosCopy[key].desc = editedValue;
    // update state
    this.setState({
      todos: todosCopy
    }, () => {
      this.updateLocalStorage();
    })
  };

  toggleCompleted = (key) => {
    // take copy of todos in stage
    let todosCopy = {...this.state.todos};
    // flip todo completed value
    todosCopy[key].completed = !todosCopy[key].completed
    // update state
    this.setState({
      todos: todosCopy
    })
    this.updateLocalStorage();
    this.updateFilters();
  };

  toggleFilter = () => {
    let filterStatus= this.state.filterStatus;
    // flip current filter state
    filterStatus = filterStatus === 'active' ? 'completed' : 'active';
    // update state
    this.setState({
      filterStatus
    }, () => {
      this.updateFilters();
    })
  };

  updateFilters = () => {
    // take copy of todos in state
    let todosCopy = {...this.state.todos};
    // take copy of filter status
    let filterStatus = this.state.filterStatus;
    // re-initialize filtered todos object
    let filteredTodos = {};
    // array of keys to loop through todo items in todos object
    let keys = Object.keys(todosCopy);

    if (filterStatus === 'active') {
      for (var i = 0, n = keys.length; i < n; i++) {
        let key = keys[i]
        if (todosCopy[key].completed === false) {
          filteredTodos[key] = todosCopy[key];
        } 
      }
    } else if (filterStatus === 'completed') {
        for (var i = 0, n = keys.length; i < n; i++) {
          let key = keys[i]
          if (todosCopy[key].completed === true) {
           filteredTodos[key] = todosCopy[key];
          } 
      }
    }

    // update state
    this.setState({
      filtered: filteredTodos
    })
  };



  render() {
    return (
      <div className="app container-fluid text-center">
      <h1 className="title">Todo Mania</h1>
      <div className="row">
      <form className="col-xs-12 col-sm-12 col-md-8 col-lg-6" onSubmit={this.handleSubmit}>
      <input className="form-control" type="text"
      placeholder="What needs to be done?" 
      value={this.state.inputValue} 
      onChange={this.handleChange}/>
      </form>
      </div>
      <button className="filter-btn" onClick={() => this.toggleFilter()}>  {this.state.filterStatus}</button>
      <div className="todo-list container-fluid">
      {
        Object.keys(this.state.filtered).map((key,index) => {
          return <Todo key={key} index={index}
            todo={this.state.filtered[key]}
            deleteTodo={() => this.deleteTodo(key)}
            updateTodo={(editedValue) => this.updateTodo(key, editedValue)}
            toggleCompleted={() => this.toggleCompleted(key)}
          />
        })
      }
      </div>
      </div>
    )
  }

}

export default App;
