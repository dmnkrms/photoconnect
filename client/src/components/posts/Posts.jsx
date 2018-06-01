import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import { getPosts } from "../../actions/postActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import options from "../common/options";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      lookingFor: "",
      isMine: false
    };

    this.setFilter = this.setFilter.bind(this);
    this.setMine = this.setMine.bind(this);
  }

  setFilter(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setMine(e) {
    this.setState({ [e.target.name]: !this.state.isMine });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getPosts();
  }

  render() {
    const { currentUserProfile } = this.props.profile;
    const { posts, loading } = this.props.post;
    const { name, location, lookingFor, isMine } = this.state;

    const noProfile = (
      <div>
        <h1 className="text-warning">User does not have a profile</h1>
        <p className="lead-small text-muted">
          If you want to view posts or create your own {<br />}
          please create your profile first
        </p>
        <Link to="/create-profile" className="btn btn-md btn-info mb-4">
          <i className="fas fa-address-card" /> Create a profile
        </Link>
      </div>
    );

    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      if (currentUserProfile === null) {
        postContent = noProfile;
      } else {
        postContent = (
          <span>
            <div className="text-center">
              <Link to="/create-post" className="btn btn-md mb-4 btn-info">
                Create new post
              </Link>
            </div>
            <div className="container text-right">
              <label className="switch ">
                <input type="checkbox" name="isMine" onChange={this.setMine} />
                <span className="slider round" />
              </label>
              <p className="text-muted">Show my posts only</p>
            </div>
            <div className="container">
              <div className="card bg-light mb-3">
                <div className="card-body">
                  <div className="row">
                    <p className="h5 text-muted ml-3 mb-2">Filters:</p>
                  </div>
                  <div className="row">
                    <div className="col-sm">
                      <TextFieldGroup
                        placeholder="Post name"
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
                    <div className="col-sm">
                      <SelectListGroup
                        name="lookingFor"
                        value={lookingFor}
                        onChange={this.setFilter}
                        options={options}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PostFeed
              posts={posts.filter(post => {
                const postName = post.name
                  .toLowerCase()
                  .includes(name.toLowerCase());
                const postLoc = post.location
                  .toLowerCase()
                  .includes(location.toLowerCase());
                const postLook = post.lookingFor.includes(lookingFor);

                // Show only my posts
                let postMine = post.user.includes("");
                if (isMine === true && currentUserProfile !== null) {
                  postMine = post.user.includes(currentUserProfile.user._id);
                }

                return postName && postLoc && postLook && postMine;
              })}
            />
          </span>
        );
      }
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-5 text-center">Job posts</h1>
              <p className="lead text-center text-muted mb-4">
                Look for availlable castings or create your own
              </p>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(Posts);
