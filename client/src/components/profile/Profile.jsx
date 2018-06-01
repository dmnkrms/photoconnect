import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileIg from "./ProfileIg";
import Spinner from "../common/Spinner";
import {
  getProfileByHandle,
  deleteAccount
} from "../../actions/profileActions";
import ProfileNotFound from "./ProfileNotFound";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
    this.props.history.push("/");
  }

  render() {
    //const { user } = this.props.auth.user;
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    let profileContent;

    if (loading) {
      profileContent = <Spinner />;
    } else if (profile === null) {
      profileContent = <ProfileNotFound />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-12">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
              {profile.user._id === user.id ? (
                <Link
                  to="/edit-profile"
                  className="btn btn-info mb-3 float-right"
                >
                  Edit profile <i className="fas fa-edit ml-2" />
                </Link>
              ) : null}
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {profile.ig ? <ProfileIg username={profile.ig} /> : null}
          {profile.user._id === user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account <i className="fas fa-trash ml-2" />
            </button>
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle, deleteAccount })(
  Profile
);
