import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Comments</div>
          <div className="card-body">
            {comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={postId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
