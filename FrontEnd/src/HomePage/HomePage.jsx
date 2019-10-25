import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Table, Icon } from "evergreen-ui";

import { userActions } from "../_actions";

class HomePage extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    user.isAdmin && this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.deleteUser(id);
  }

  buttonClick(e) {
    console.log("123");
    e.preventDefault();
  }

  handleBlockUser(id) {
    return e => this.props.blockUser(id);
  }

  handleUnBlockUser(id) {
    return e => this.props.unblockUser(id);
  }

  render() {
    const { user, users } = this.props;
    if (!user.isAdmin)
      return (
        <div>
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React!!</p>
        </div>
      );

    return (
      // <div className="col-md-6 col-md-offset-3">
      <div>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          // <ul>
          //     {users.items.map((user, index) =>
          //         <li key={user.id}>
          //             {user.firstName + ' ' + user.lastName}
          //             {
          //                 user.deleting ? <em> - Deleting...</em>
          //                 : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
          //                 : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
          //             }
          //             <Button appearance='primary' onClick={this.buttonClick}>Test</Button>
          //         </li>
          //     )}
          // </ul>
          <Table>
            <Table.Head>
              {/* <Table.SearchHeaderCell /> */}
              <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Username</Table.TextHeaderCell>
              <Table.TextHeaderCell>Action</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body height={240}>
              {users.items.map((user, index) => (
                <Table.Row
                  key={user.id}
                  isSelectable
                  //onSelect={() => alert(user.firstName)}
                >
                  <Table.TextCell>{user.firstName}</Table.TextCell>
                  <Table.TextCell>{user.lastName}</Table.TextCell>
                  <Table.TextCell>{user.username}</Table.TextCell>
                  <Table.TextCell>
                    <Button
                      //appearance="primary"
                      onClick={this.handleDeleteUser(user.id)}
                    >
                      <Icon icon="remove" color="danger" marginRight={16} />
                      Remove
                    </Button>
                    {user.isBlocked ? (
                      <Button
                        appearance="primary"
                        onClick={this.handleUnBlockUser(user.id)}
                        marginLeft="15px"
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        appearance="primary"
                        onClick={this.handleBlockUser(user.id)}
                        marginLeft="15px"
                      >
                        Block
                      </Button>
                    )}
                  </Table.TextCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        {/* <p>
          <Link to="/login">Logout</Link>
        </p> */}
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
  blockUser: userActions.block,
  unblockUser: userActions.unblock
};

const connectedHomePage = connect(
  mapState,
  actionCreators
)(HomePage);
export { connectedHomePage as HomePage };
