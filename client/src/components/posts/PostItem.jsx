import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, candidateFor } from "../../actions/postActions";
import Moment from "react-moment";

class PostItem extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="card card-body mb-3">
          <div className="col-12">
            <h3 className="display-5 text-center">
              <Link to={`/post/${post._id}`}>{post.name}</Link>
            </h3>
            <p className="text-center">
              <i className="text-secondary fas fa-map-marker" /> {post.location}
            </p>
            <br />
            <h5>Looking for: {post.lookingFor}</h5>
            <p>
              Posted on: <Moment format="MM-DD">{post.date}</Moment>
            </p>

            <p className="text-center">
              <i className="fas fa-male" /> {post.candidates.length} Candidates
            </p>
          </div>

          <div className="col-md-10">
            <p className="lead">{post.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  candidateFor: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, candidateFor })(PostItem);
