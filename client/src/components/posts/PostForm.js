import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends React.Component {
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
    this.props.addPost({text : this.state.text})
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
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Post"
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

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})



export default connect(mapStateToProps, {addPost})(PostForm);
