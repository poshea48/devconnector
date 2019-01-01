import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import { clearErrors } from '../../actions/clearErrorAction'
// import { withRouter } from 'react-router-dom'; // maybe not needed

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      social: {},
      // twitter: '',
      // facebook: '',
      // linkedin: '',
      // youtube: '',
      // instagram: '',
      errors: {}
    }
  }
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  componentDidUpdate(prevProps) {
   if (prevProps.errors !== this.props.errors) {
    this.setState({ errors: this.props.errors });
   }
   if (prevProps.profile.profile !== this.props.profile.profile) {
     const { profile } = this.props.profile
     const { social } = profile
     profile.skills = profile.skills.join(',')
     this.setState(prevState => ({
       ...prevState,
       ...profile,
       ...social
     }))
   }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return ({ errors: nextProps.errors }) // equivalent to setState
    }

    if (nextProps.profile.profile !== prevState) {
      return ({ profile: nextProps.profile })
    }
    return null
  }

  onChange = e => {
    return this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    const profile = {...this.state}
    this.props.createProfile(profile, this.props.history)
  }

  openSocialMediaField = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return {displaySocialInputs: !prevState.displaySocialInputs}
    })
  }
  render () {
    const {errors, displaySocialInputs } = this.state
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = ['Twitter', 'Facebook', 'Linkedin', 'Youtube', 'Instagram'].map((social, i) => (
        <div key={i} >
          <InputGroup
            placeholder={`${social} Profile URL`}
            name={social.toLowerCase()}
            icon={`fab fa-${social.toLowerCase()}`}
            value={this.state[social.toLowerCase()]}
            onChange={this.onChange}
            error={errors[social.toLowerCase()]}
          />
        </div>
      ))
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0},
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student", value: "Student" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" },

    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL.  Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Where do you currently work?"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Do you have a website?"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Where do you reside?"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,Javascript,Ruby)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Include your Github username to show off latest repos"
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Talk about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.openSocialMediaField}
                    className="btn btn-light">
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile, clearErrors })(EditProfile);
