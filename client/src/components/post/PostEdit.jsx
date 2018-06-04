import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { getPost, editPost } from "../../actions/postActions";
import isEmpty from "../../validation/is-empty";
import options from "../common/options";

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      location: "",
      lookingFor: "",
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.post) {
      const post = nextProps.post;
      // If post does not exist -> make an empty string
      post.description = !isEmpty(post.description) ? post.description : "";

      this.setState({
        id: post._id,
        name: post.name,
        location: post.location,
        lookingFor: post.lookingFor,
        description: post.description
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      id: this.state.id,
      name: this.state.name,
      location: this.state.location,
      lookingFor: this.state.lookingFor,
      description: this.state.description
    };

    this.props.editPost(newPost, () => {
      this.props.history.push("/post/" + this.props.post._id);
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit post</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Your proposal name"
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City where project will take part"
                />
                <SelectListGroup
                  placeholder="* Looking for"
                  name="lookingFor"
                  value={this.state.lookingFor}
                  onChange={this.onChange}
                  options={options}
                  error={errors.lookingFor}
                  info="Who are you looking for?"
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Information about the project"
                />
                <input
                  type="submit"
                  value="Save"
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

PostEdit.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post.post,
  errors: state.errors
});

export default connect(mapStateToProps, { getPost, editPost })(PostEdit);
