import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { todoActions } from "../_actions";
import { Pane, Button, Heading } from "evergreen-ui";
import { Link } from "react-router-dom";
import { history } from "../_helpers";
import { CreateTodoPage } from "./CreateTodoPage";

class ListTodoPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNewTodo = this.handleAddNewTodo.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.getTodos();
  }

  handleAddNewTodo(e) {
    e.preventDefault();
    history.push('/todos/create');
  }

  render() {
    const { user, todos } = this.props;
    const { loading, items } = todos;
    return (
      <Pane>
        {/* <Route exact path='/todos/create' component={CreateTodoPage} /> */}
        <Pane marginTop={10}>
          {/* <Link to='/todos/create'> */}
            <Button onClick={this.handleAddNewTodo}>Add new</Button>
          {/* </Link> */}
        </Pane>
        {loading && <em>Loading todos...</em>}
        {todos.error && (
          <span className="text-danger">ERROR: {todos.error}</span>
        )}
        {items &&
          items.map(todo => (
            <Pane
              key={todo.id}
              display="flex"
              flexDirection="column"
              width={250}
              // height={300}
              margin={10}
              padding={10}
              float="left"
              backgroundColor={ todo.isCompleted ? "#D4EEE2" : todo.categoryBackgroundColor }
              borderRadius={6}
            >
              <Heading>{todo.title}</Heading>
              <div style={{margin: "10px 0px"}}>
                {todo.description && todo.description.length > 50
                  ? `${todo.description.substring(0, 50)} ...`
                  : todo.description}
              </div>
              <Pane>
                {!todo.isCompleted && <Button onClick={() => this.props.markCompleted(todo)}>Mark completed</Button> }
                <Button marginLeft={10} onClick={() => this.props.remove(todo)}>Remove</Button>
              </Pane>
            </Pane>
          ))}
      </Pane>
    );
  }
}

function mapState(state) {
  const { authentication, todos } = state;
  const { user } = authentication;
  return { user, todos };
}

const actionCreators = {
  getTodos: todoActions.getTodos,
  markCompleted: todoActions.markCompleted,
  remove: todoActions.remove
  // deleteUser: userActions.delete,
  // blockUser: userActions.block,
  // unblockUser: userActions.unblock
};

const connectedListTodoPage = connect(
  mapState,
  actionCreators
)(ListTodoPage);
export { connectedListTodoPage as ListTodoPage };
