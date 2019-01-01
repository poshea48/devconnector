import React from 'react'
import PropTypes from 'prop-types'
import PostItem from './PostItem'


class PostFeed extends React.Component {
  render() {
    const { posts } = this.props
    const postsContent = posts.map(post => (<PostItem key={post._id} post={post} />))
    return (
      <div className="posts">
        {postsContent}
      </div>
    )
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed
