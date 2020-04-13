import React, { Component } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos } from "../actions";
import { StoreState } from "../reducers";

interface Props {
  todos: Todo[];
  fetchTodos(): any;
}
interface State {}

class _App extends Component<Props, State> {
  state = {};

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return <div>Hi!</div>;
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

const App = connect(mapStateToProps, { fetchTodos })(_App);

export default App;
