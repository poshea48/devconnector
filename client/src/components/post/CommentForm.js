import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      return this.setState({ errors: this.props.errors })
    }

  }

  onSubmit = e => {
    e.preventDefault();
    this.props.addComment(this.props.postId, {text : this.state.text})
    this.setState({ text: '', errors: {}})
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { errors } = this.state
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a Comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})



export default connect(mapStateToProps, {addComment})(CommentForm);
