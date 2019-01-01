import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentUser: {}
    }
  }

  // make get comment into actions (also get post)
  // get comments from comments in props

  componentDidMount() {
    const userId = this.props.comment.user
    if (userId) {
      axios
        // get public profile of user
        .get(`/api/profile/user/${this.props.comment.user}`)
        .then(res => {
          if (res.data) {
            this.setState({
              commentUser: res.data.user
            })
          }
        })
        .catch(err => console.log("ERRORRRRRR"))
    }

  }

  // componentWillUnmount() {
  //   console.log("about to unmount")
  //   this.setState({
  //     commentUser: {}
  //   })
  // }

  render () {
    const {comment} = this.props
    const { commentUser } = this.state
    let commentUserContent;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          {commentUser ? (
            <div className="col-md-2">
              <Link to={`/profile/user/${commentUser._id}`}>
                <img
                  className="rounded-circle d-none d-md-block"
                  src={commentUser.avatar}
                  alt={commentUser.name}
                />
                <br />
                <p className="text-center">{commentUser.name}</p>
              </Link>
            </div>
          ) : (
            <div className="col-md-2">
              <p className="text-center">Could not find User</p>
            </div>
          )}

          <div className="col-md-10">
            <p className="lead">
              {comment.text}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default CommentItem;
