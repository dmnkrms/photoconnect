import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="container">
        <div className="row posts">
          {posts.map(post => <PostItem key={post._id} post={post} />)}
        </div>
      </div>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
