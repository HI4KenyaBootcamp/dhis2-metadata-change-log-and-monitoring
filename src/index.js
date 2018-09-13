import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import { init, getInstance } from 'd2/lib/d2';

// initialize d2 library - local
init({ baseUrl: 'https://test.hiskenya.org/kenya/api' });

// print the currentUser name in the console
getInstance().then(d2 => {
  console.log(d2.currentUser.name);
});

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  render() {
    return (
      <React.Fragment>
        <h3>Todo</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <TodoList items={this.state.items} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
