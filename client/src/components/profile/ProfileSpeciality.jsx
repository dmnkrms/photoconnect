import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileSpeciality extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.name.trim().split(" ")[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Speciality</h3>
            <div className="lead">
              {isEmpty(profile.speciality) ? (
                <span>{firstName} did not specified his speciality</span>
              ) : (
                <p className="lead">{profile.speciality.join(", ")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileSpeciality.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileSpeciality;
