import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Pane } from "evergreen-ui";

const TopMenu = props => {
  const { user } = props;
  return (
    <Pane
      flex={1}
      alignItems="center"
      display="flex"
      background="overlay"
      height="50px"
    >
      <Pane flex={1} display="flex">
        {/* <HyperLink href="https://www.google.com" style={{color: "white"}}>Home</HyperLink> */}
        <Link to="/" className="btn btn-link" style={{ color: "white" }}>
          Home
        </Link>
        <Link to="/todos" className="btn btn-link" style={{ color: "white" }}>
          Todo
        </Link>
      </Pane>
      <Pane>
        {!user && (
          <Link
            to="/register"
            className="btn btn-link"
            style={{ color: "white" }}
          >
            Register
          </Link>
        )}
        <Link to="/login" className="btn btn-link" style={{ color: "white" }}>
          {user ? "Logout" : "Login"}
        </Link>
        {user && (
          <Link
            to="/profile"
            className="btn btn-link"
            style={{ color: "white" }}
          >
            Profile
          </Link>
        )}
      </Pane>
    </Pane>
  );
};

// export { TopMenu };
function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const connectedTopMenu = connect(
  mapState,
  {}
)(TopMenu);
export { connectedTopMenu as TopMenu };
