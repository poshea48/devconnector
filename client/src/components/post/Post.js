import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import { getPost, getComments } from '../../actions/postActions'
import Spinner from '../common/Spinner'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
import axios from 'axios'

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    const postId = this.props.match.params.id
    this.props.getPost(postId)
    // get comments add to this.props.post.post

  }

  componentDidUpdate(prevProps) {
    const postId = this.props.match.params.id
    if (this.props.post.post.comments && this.props.post.post.comments.length !== this.state.comments.length) {
      this.props.post.post.comments.map(commentId => {
        axios
          .get(`/api/posts/comments/${postId}`)
          .then(res => this.setState({ comments: res.data }))
          .catch(err => console.log(err))
      })
    }

  }

  render () {
    const { post, loading } = this.props.post
    console.log(this.state.comments)
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id}/>
          <CommentFeed comments={this.state.comments} />
        </div>
      )
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    post: state.post
  }

}

export default connect(mapStateToProps, {getPost, getComments})(Post);
