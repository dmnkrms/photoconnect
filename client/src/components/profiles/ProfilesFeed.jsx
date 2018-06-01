import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";

class ProfileFeed extends Component {
  render() {
    const { profiles } = this.props;

    return (
      <div className="container">
        <div className="row profiles">
          {profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </div>
      </div>
    );
  }
}

ProfileFeed.propTypes = {
  profiles: PropTypes.array.isRequired
};

export default ProfileFeed;
