import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'


class CommentFeed extends React.Component {
  render() {
    const { comments } = this.props
    const commentsContent = comments.map(comment => (<CommentItem key={comment._id} comment={comment} />))
    return (
      <div className="comments">
        {commentsContent}
      </div>
    )
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentFeed
