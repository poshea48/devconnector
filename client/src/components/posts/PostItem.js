import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { deletePost, likePost, removeLike } from '../../actions/postActions';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postUser: {},
      likes: [],
      currentLiked: null
    }
  }

  onDelete = e => {
    e.preventDefault();
    this.props.deletePost(this.props.post._id)
  }

  onLike = e => {
    e.preventDefault();
    this.props.likePost(this.props.post._id)
  }

  userLiked = (postId) => {
    axios.get(`/api/posts/like/${postId}`)
    .then(res => {
      return res.data.length > 0
    })
  }
  onUnLike = e => {
    e.preventDefault();
    this.props.removeLike(this.props.post._id)
  }

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.post.user}`)
      .then(res => {
        if (res.data) {
          this.setState({ postUser: res.data })
        }
      })
      .catch(err => console.log("ERRORRRRRR"))
    axios
      .get(`/api/posts/likes/${this.props.post._id}`)
      .then(res => {
        this.setState({ likes: res.data }, () => {
          this.setState({
            currentLiked: this.setCurrentLiked()
          })
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post.likes_count !== prevState.likes.length) {
      axios
        .get(`/api/posts/likes/${this.props.post._id}`)
        .then(res => {
          this.setState({ likes: res.data })
        })
    }
  }

  // componentWillUnMount() {
  //   this.setState({
  //     postUser: {},
  //     likes: [],
  //     currentLiked: null
  //   })
  // }

  setCurrentLiked = () => {
    let currentLikes = this.state.likes.filter(like => {
      return like.user === this.props.auth.user.id
    })
    return currentLikes.length > 0
  }

  render () {
    const { post, auth, showActions } = this.props;
    const { postUser } = this.state
    const thumbIconClass = classnames({
      'fas fa-thumbs-up': true,
      'text-success': this.state.currentLiked,
      'text-secondary': !this.state.currentLiked
    })
    return (
      <div className="card card-body mb-3">
        <div className="row">
          {postUser ? (
            <div className="col-md-2">
              <Link to={`/profile/user/${postUser._id}`}>
                <img
                  className="rounded-circle d-none d-md-block"
                  src={postUser.avatar}
                  alt={postUser.name}
                />
                <br />
                <p className="text-center">{postUser.name}</p>
              </Link>
            </div>
          ) : (
            <div className="col-md-2">
              <p className="text-center">Could not find User</p>
            </div>
          )}

          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (<span>
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={this.onLike}
              >
                <i className={thumbIconClass} />
                <span className="badge badge-light">{post.likes_count}</span>
              </button>
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={this.onUnLike}
              >
                <i className="text-secondary fas fa-thumbs-down"></i>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user === auth.user.id ? (
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={this.onDelete}
                  >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>) : null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {deletePost, likePost, removeLike})(PostItem);
