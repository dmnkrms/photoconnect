import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import ModelDetailsEdit from "../common/ModelDetailsEdit";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      name: "",
      handle: "",
      location: "",
      occupation: "",
      gender: "",
      height: "",
      agency: "",
      bio: "",
      webpage: "",
      ig: "",
      facebook: "",
      linkedin: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // If profile does not exist -> make an empty string
      profile.webpage = !isEmpty(profile.webpage) ? profile.webpage : "";
      profile.height = !isEmpty(profile.height) ? profile.height : "";
      profile.agency = !isEmpty(profile.agency) ? profile.agency : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.ig = !isEmpty(profile.social.ig) ? profile.social.ig : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      this.setState({
        name: profile.name,
        handle: profile.handle,
        location: profile.location,
        occupation: profile.occupation,
        height: profile.height,
        gender: profile.gender,
        agency: profile.agency,
        bio: profile.bio,
        webpage: profile.webpage,
        ig: profile.ig,
        facebook: profile.facebook,
        linkedin: profile.linkedin
      });
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
      gender: this.state.gender,
      height: this.state.height,
      agency: this.state.agency
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
              <Link to="/profiles" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
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
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City you are based in"
                />
                {this.state.occupation === "Model" ? (
                  <ModelDetailsEdit
                    height={this.state.height}
                    onChange={this.onChange}
                    agency={this.state.agency}
                    gender={this.state.gender}
                  />
                ) : null}
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
                <input
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
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
