import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

interface IProps {
  exact?: boolean;
  user:any;
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, user, ...rest }:IProps) => (
  <Route
    {...rest}
    render={props =>
      user.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


const mapStateToProps = (state:any) => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
