import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner" />
        <div className="container text-light">
          <div className="row">
            <div className="col-md-12 text-center">
              <br />
              <h3 className=" mb-4">Welcome to Binary</h3>
              <p>Create your profile and connect with Employers</p>
              <br />
              <Link className="btn btn-lg btn-primary mr-4" to="/register">
                Sign Up
              </Link>
              <Link className="btn btn-lg btn-light" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Landing);
