import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "../styles/custom-datepicker.css";

import { userActions } from "../_actions";
import { nameOf } from "../_helpers/uility";
import { Pane, TextInputField, Button, FormField } from "evergreen-ui";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        birthdate: new Date()
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleDateChange(value) {
    const name = this.refs.birth.input.name;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.birthdate
    ) {
      this.props.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    const { firstName, lastName, username, password, birthdate } = user;
    return (
      <Pane width={400} marginTop={50}>
        <form name="form" onSubmit={this.handleSubmit}>
          <TextInputField
            isInvalid={submitted && !firstName}
            name={nameOf({firstName})}
            label="First Name"
            value={firstName}
            required
            onChange={this.handleChange}
          />
          <TextInputField
            isInvalid={submitted && !lastName}
            name={nameOf({lastName})}
            label="Last Name"
            value={lastName}
            required
            onChange={this.handleChange}
          />
          <TextInputField
            isInvalid={submitted && !username}
            name={nameOf({username})}
            label="Username"
            value={username}
            required
            onChange={this.handleChange}
          />
          <TextInputField
            isInvalid={submitted && !password}
            type="password"
            name={nameOf({password})}
            label="Password"
            value={password}
            required
            onChange={this.handleChange}
          />
          <FormField label="Birthdate" >
            <div display="block">
              <DatePicker
                ref="birth"
                name={nameOf({birthdate})}
                selected={birthdate}
                dateFormat="MM/dd/yyyy"
                onChange={this.handleDateChange}
                borderRadius="4px"
              />
            </div>
          </FormField>
          <FormField isRequired={false} label=" ">
            <Button>Register</Button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </FormField>
        </form>
      </Pane>
    );
    /*return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !user.firstName ? " has-error" : "")
            }
          >
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={this.handleChange}
            />
            {submitted && !user.firstName && (
              <div className="help-block">First Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.lastName ? " has-error" : "")
            }
          >
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={user.lastName}
              onChange={this.handleChange}
            />
            {submitted && !user.lastName && (
              <div className="help-block">Last Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
            {submitted && !user.username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.birthdate ? " has-error" : "")
            }
          >
            <label htmlFor="birthdate">Birthdate</label>
						<div display="block">
							<DatePicker
								ref="birth"
								name="birthdate"
								selected={this.state.user.birthdate}
								dateFormat="MM/dd/yyyy"
								onChange={this.handleDateChange}
								borderRadius="4px"
							/>
						</div>
            {submitted && !user.birthdate && (
              <div className="help-block">birthdate is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );*/
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register
};

const connectedRegisterPage = connect(
  mapState,
  actionCreators
)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
