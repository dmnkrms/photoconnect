import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileModel extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.name.trim().split(" ")[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Detailed {firstName} info</h3>
            <div className="row">
              <div className="col-2 text-muted">
                <p>Gender: </p>
                <p>Height: </p>
                {isEmpty(profile.agency) ? null : <p>Agency:</p>}
              </div>
              <div className="col">
                <p>
                  {profile.gender}
                  {"  "}
                  {profile.gender === "Male" ? (
                    <i className="fas fa-mars" />
                  ) : (
                    <i className="fas fa-venus" />
                  )}
                </p>
                <p>{profile.height + " cm"}</p>
                {isEmpty(profile.agency) ? null : <p>{profile.agency}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileModel.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileModel;
