import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Pane } from "evergreen-ui";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { ProfilePage } from "../ProfilePage";
import { ListTodoPage } from "../Todo/ListTodoPage";
import { CreateTodoPage } from "../Todo/CreateTodoPage";
import { TodoHomePage } from "../Todo/TodoHomePage";
import { TopMenu } from "../TopMenu";

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen(() => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert, user } = this.props;
    const style = {
      margin: "10px",
      padding: "10px"
    };
    return (
      <div style={style}>
        {/* <div className="container"> */}
        <Router history={history}>
          <Pane>
            <TopMenu user={user} />
            <Pane>
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}

              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/todos" component={TodoHomePage} />
                {/* <Route exact path="/todos/create" component={CreateTodoPage} /> */}
                <Redirect from="*" to="/" />
              </Switch>
            </Pane>
          </Pane>
        </Router>
        {/* <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
          </div> */}
        {/* </div> */}
      </div>
    );
  }
}

function mapState(state) {
  const { alert, authentication } = state;
  const { user } = authentication;
  return { alert, user };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(
  mapState,
  actionCreators
)(App);
export { connectedApp as App };
