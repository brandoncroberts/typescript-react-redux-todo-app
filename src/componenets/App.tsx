import React, { Component } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";

interface Props {
  todos: Todo[];
  // You need to give fetchTodos type Function because it's a redux thunk action
  // and redux thunk actions don't have the shape that the connect fucntion expects
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}
interface State {
  fetching: boolean;
}

class _App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { fetching: false };
  }
  componentDidUpdate(prevProps: Props) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? <p>Fetching</p> : null}

        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);

export default App;
