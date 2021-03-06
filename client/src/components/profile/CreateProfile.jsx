import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";
import options from "../common/options";
import PhotographerType from "../common/PhotographerType";
import ModelDetails from "../common/ModelDetails";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      name: "",
      handle: "",
      location: "",
      occupation: "",
      speciality: [],
      gender: "",
      height: "",
      agency: "",
      bio: "",
      webpage: "",
      ig: "",
      facebook: "",
      linkedin: "",
      disabled: true,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDisabled = this.onDisabled.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      name: this.state.name,
      handle: this.state.handle,
      location: this.state.location,
      occupation: this.state.occupation,
      bio: this.state.bio,
      webpage: this.state.webpage,
      ig: this.state.ig,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      speciality: this.state.speciality,
      gender: this.state.gender,
      height: this.state.height,
      agency: this.state.agency
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSelect(e) {
    const speciality = this.state.speciality;
    if (e.target.checked) {
      speciality.push(e.target.value);
    } else {
      const index = speciality.indexOf(+e.target.value);
      speciality.splice(index, 1);
    }
  }

  onDisabled(e) {
    this.setState({ disabled: !this.state.disabled });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Instagram user handle"
            name="ig"
            icon="fab fa-instagram"
            value={this.state.ig}
            onChange={this.onChange}
            error={errors.ig}
          />
          <InputGroup
            placeholder="Facebook user handle"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin user handle"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let people know something about you!
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Full name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Your full name"
                />
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Unique profile handle"
                />
                <SelectListGroup
                  placeholder="* Occupation"
                  name="occupation"
                  value={this.state.occupation}
                  onChange={this.onChange}
                  options={options}
                  error={errors.occupation}
                  info="Your main occupation"
                />

                {this.state.occupation === "Photographer" ? (
                  <PhotographerType onChange={this.onSelect} />
                ) : null}
                {this.state.occupation === "Model" ? (
                  <ModelDetails
                    height={this.state.height}
                    onChange={this.onChange}
                    agency={this.state.agency}
                  />
                ) : null}
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City you are based in"
                />
                <TextFieldGroup
                  placeholder="Webpage"
                  name="webpage"
                  value={this.state.webpage}
                  onChange={this.onChange}
                  error={errors.webpage}
                  info="Your own or your company's webpage"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-info"
                  >
                    Add social network links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <br />
                <label className="checkbox text-muted ml-2">
                  <input type="checkbox" onChange={this.onDisabled} /> Check if
                  you agree to display your personal data on your public profile
                  for discovery purposes
                </label>
                <input
                  disabled={this.state.disabled}
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
