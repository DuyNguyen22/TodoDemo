import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "../styles/custom-datepicker.css";
import moment from 'moment'

import { userActions } from "../_actions";
import { nameOf } from "../_helpers/uility";
import { Pane, TextInputField, Button, FormField } from "evergreen-ui";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        birthdate: new Date()
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    this.props.getUserById(userId);
  }

  componentWillReceiveProps(nextProps){
    //Perform some operation
    let newState = {
      ...this.state,
      ...nextProps.profile
    };
    // newState.user && newState.user.birthdate && 
    //   (newState.user.birthdate = moment(newState.user.birthdate, 'YYYY-MM-DDTHH:mm:ss').toDate())
    this.setState(newState);
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
      user.birthdate
    ) {
      this.props.update(user);
    }
  }

  render() {
    const { profile } = this.props;
    const { updating, loading } = profile;
    const { submitted, user } = this.state;
    if (!user || loading) {
      return (<p>loading</p>);
    }

    const { firstName, lastName } = user;
    const birthdate = moment(user.birthdate, 'YYYY-MM-DDTHH:mm:ss').toDate();
    const momentTest = moment;
    const dateTest = momentTest(user.birthdate, 'YYYY-MM-DDTHH:mm:ss');
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
            <Button>Update</Button>
            {updating && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </FormField>
        </form>
      </Pane>
    );
  }
}

function mapState(state) {
  const { profile, authentication } = state;
  const { id: userId } = authentication.user;
  return { profile, userId };
}

const actionCreators = {
  update: userActions.update,
  getUserById: userActions.getById
};

const connectedProfilePage = connect(
  mapState,
  actionCreators
)(ProfilePage);
export { connectedProfilePage as ProfilePage };