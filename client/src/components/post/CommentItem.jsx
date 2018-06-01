import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import Moment from "react-moment";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body">
        <div className="row">
          <div className="col-1 col-sm-1">
            <Link className="nav-link" to={`/profile/${comment.handle}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt={comment.name}
                style={{ width: "50px" }}
              />
            </Link>
          </div>
          <div className="col-10 ">
            <p className="text-muted">
              <Moment format="MMM DD, YYYY">{comment.date}</Moment>
            </p>
            <p className="lead">{comment.text}</p>
          </div>
          <div className="col-1">
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
