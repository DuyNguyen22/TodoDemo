import React from "react";
import { connect } from "react-redux";
import { todoActions } from "../_actions";
import { Pane, Button, Heading, Dialog, IconButton } from "evergreen-ui";
import { history } from "../_helpers";
import { UpdateTodoPage } from './UpdateTodoPage';

class ListTodoPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNewTodo = this.handleAddNewTodo.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleSubmitEditTodo = this.handleSubmitEditTodo.bind(this);
    this.state = {
      showUpdateTodoDialog: false
    };
    this.updateDialogRef = React.createRef();
  }

  componentDidMount() {
    this.props.getTodos();
  }

  handleAddNewTodo(e) {
    e.preventDefault();
    history.push("/todos/create");
  }

  handleEditTodo(e, todo) {
    e.preventDefault();
    this.setState({ showUpdateTodoDialog: true, todo });
  }

  handleSubmitEditTodo() {
    // this.props.updateTodo(todo)
    //   .then(data => {
    //     console.log('update completed');
    //   });
    this.updateDialogRef.current.wrappedInstance.handleSubmit();
    //this.setState({ showUpdateTodoDialog: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todoUpdate.udpateSuccess) {
      this.setState({ showUpdateTodoDialog: false })
    }
  }

  render() {
    const { todos } = this.props;
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
              backgroundColor={
                todo.isCompleted ? "#D4EEE2" : todo.categoryBackgroundColor
              }
              borderRadius={6}
            >
              <Pane display="flex">
                <Pane flex={1} display="flex">
                  <Heading>{todo.title}</Heading>
                </Pane>
                <Pane>
                  <IconButton marginRight={8} icon="edit" type="button" onClick={ e => this.handleEditTodo(e, todo) }></IconButton>
                </Pane>
              </Pane>
              
              <div style={{ margin: "10px 0px" }}>
                {todo.description && todo.description.length > 50
                  ? `${todo.description.substring(0, 50)} ...`
                  : todo.description}
              </div>
              <Pane>
                {!todo.isCompleted && (
                  <Button onClick={() => this.props.markCompleted(todo)}>
                    Mark completed
                  </Button>
                )}
                <Button marginLeft={10} onClick={() => this.props.remove(todo)}>
                  Remove
                </Button>
              </Pane>
            </Pane>
          ))}
        {/* <Pane> */}
          <Dialog
            isShown={this.state.showUpdateTodoDialog}
            title="Update todo"
            onCloseComplete={() => this.setState({ showUpdateTodoDialog: false, todo: null })}
            confirmLabel="OK"
            shouldCloseOnOverlayClick={false}
            hasClose={true}
            onConfirm={() => this.handleSubmitEditTodo()}
          >
            {this.state.showUpdateTodoDialog && this.state.todo ? <UpdateTodoPage todo={this.state.todo} ref={this.updateDialogRef} /> : <div />}
          </Dialog>

          {/* <Button onClick={() => this.setState({ showUpdateTodoDialog: true })}>
            Show Dialog
          </Button> */}
        {/* </Pane> */}
      </Pane>
    );
  }
}

function mapState(state) {
  const { authentication, todos, todoUpdate } = state;
  const { user } = authentication;
  return { user, todos, todoUpdate };
}

const actionCreators = {
  getTodos: todoActions.getTodos,
  markCompleted: todoActions.markCompleted,
  remove: todoActions.remove,
  updateTodo: todoActions.update
};

const connectedListTodoPage = connect(
  mapState,
  actionCreators
)(ListTodoPage);
export { connectedListTodoPage as ListTodoPage };
