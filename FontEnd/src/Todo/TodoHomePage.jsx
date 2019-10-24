import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { todoActions } from "../_actions";
import { Pane, Button, Heading } from "evergreen-ui";
import { Link } from "react-router-dom";
import { history } from "../_helpers";
import { ListTodoPage } from "./ListTodoPage";
import { CreateTodoPage } from "./CreateTodoPage";

export class TodoHomePage extends React.Component {

  render() {
    return (
      <Pane>
        <Route exact path="/todos" component={ListTodoPage} />
        <Route exact path="/todos/create" component={CreateTodoPage} />
        {/* <Redirect from="*" to="/todos" /> */}
      </Pane>
    );
  }
}