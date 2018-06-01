import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../common/Spinner";
import { getPost, deletePost, candidateFor } from "../../actions/postActions";
import Moment from "react-moment";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  onApplyClick(id, currentUser) {
    this.props.candidateFor(id, currentUser);
  }
  onDeleteClick(id) {
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { user } = this.props.auth;
    const { post, loading } = this.props.post;

    let currentUser = {};
    if (this.props.profile.currentUserProfile !== null) {
      currentUser = this.props.profile.currentUserProfile;
    }

    let postContent;
    let isOwner = false;

    if (user.id === post.user) {
      isOwner = true;
    }

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white text-center display-4">
                {post.name} <br />
                <p className="lead mt-1">
                  <i className="fas fa-map-marker" /> {post.location}
                </p>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="text-muted">Looking for:</h5>
                    <p className="h2 text-info">{post.lookingFor}</p>
                    <br />
                    <p className="h5 text-muted">
                      Posted on:{" "}
                      <Moment format="YYYY-MM-DD">{post.date}</Moment>
                    </p>
                    <br />
                    <p className="h5 text-muted">
                      Active till:{" "}
                      <Moment format="YYYY-MM-DD">{post.activeTill}</Moment>
                    </p>
                    {post.description === "" ? null : (
                      <div>
                        <br />
                        <p className="h5 text-info">Description:</p>
                        <p className="lead">{post.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="card card-body">
                      {post.candidates.length > 0 ? (
                        <span>
                          <h5 className="text-center text-info">
                            <i className="fas fa-male" />{" "}
                            {post.candidates.length} Candidates:
                          </h5>
                          <div className="row text-center">
                            {post.candidates.map((candidate, i) => (
                              <Link
                                key={i}
                                className="nav-link"
                                to={`/profile/${candidate.handle}`}
                              >
                                <img
                                  className="rounded-circle"
                                  src={candidate.avatar}
                                  alt={candidate.name}
                                  style={{ width: "23px" }}
                                />
                              </Link>
                            ))}
                          </div>
                        </span>
                      ) : (
                        <h5 className="text-center text-info">
                          No candidates right now
                        </h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isOwner ? (
            <div className="text-center">
              <button
                onClick={this.onDeleteClick.bind(this, post._id, currentUser)}
                className="btn btn-danger mb-3"
              >
                Delete post <i className="fas fa-trash ml-2" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={this.onApplyClick.bind(this, post._id, currentUser)}
                className="btn btn-success mb-3"
              >
                Apply <i className="fas fa-check" />
              </button>
            </div>
          )}
          <br />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts" className="btn btn-light mb-3">
                Back to posts
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  candidateFor: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPost, candidateFor, deletePost })(
  Post
);
