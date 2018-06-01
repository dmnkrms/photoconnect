import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Frontpage extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
  }

  render() {
    return (
      <div className="frontpage">
        <div className="dark-overlay frontpage-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-right">
                <h1 className="display-1 mb-2">Photo Connect</h1>
                <p className="lead">
                  Create a profile, look for people, join projects and
                  collaborate!
                </p>
                <hr />
                <div className="mt-5">
                  <Link to="/register" className="btn btn-lg btn-light mr-4">
                    Sign Up!
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Frontpage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Frontpage);
