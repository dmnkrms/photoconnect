import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileFeed from "./ProfilesFeed";
import { getProfiles } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      occupation: ""
    };

    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { name, location, occupation } = this.state;
    let profileItems;

    const options = [
      { label: "Please choose one...", value: "" },
      { label: "Photographer", value: "Photographer" },
      { label: "Model", value: "Model" }
    ];

    // Show spinner
    if (loading) {
      profileItems = (
        <div className="text-center col-12">
          <Spinner />
        </div>
      );
    } else {
      if (profiles !== null && profiles.length > 0) {
        profileItems = (
          <ProfileFeed
            profiles={profiles.filter(profile => {
              const profileName = profile.name
                .toLowerCase()
                .includes(name.toLowerCase());
              const profileLocation = profile.location
                .toLowerCase()
                .includes(location.toLowerCase());
              const profileOccupation = profile.occupation.includes(occupation);

              return profileName && profileLocation && profileOccupation;
            })}
          />
        );
      } else {
        profileItems = (
          <h1 className="dislplay-4 text-center mt-5 text-danger">
            No profiles found!
          </h1>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-5 text-center">People</h1>
            <p className="lead text-center text-muted mb-4">
              Look for people that are working in photography field
            </p>
            <div className="container">
              <div className="card bg-light">
                <div className="card-body">
                  <div className="row">
                    <p className="h5 text-muted ml-3 mb-2">Filters:</p>
                  </div>
                  <div className="row">
                    <div className="col-sm">
                      <SelectListGroup
                        name="occupation"
                        value={occupation}
                        onChange={this.setFilter}
                        options={options}
                      />
                    </div>
                    <div className="col-sm">
                      <TextFieldGroup
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={this.setFilter}
                      />
                    </div>
                    <div className="col-sm">
                      <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={this.setFilter}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {profileItems}
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
