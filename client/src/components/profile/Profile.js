import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from "./ProfileHeader"
import ProfileAbout from "./ProfileAbout"
import ProfileCreds from "./ProfileCreds"
import ProfileGithub from "./ProfileGithub"
import Spinner from '../common/Spinner'
import { getProfileByHandle, getProfileByUserId } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'

class Profile extends React.Component {
  componentDidMount() {
    const { handle, user_id } = this.props.match.params

    handle && this.props.getProfileByHandle(handle)
    user_id && this.props.getProfileByUserId(user_id)
  }

  componentDidUpdate() {
    this.props.profile.profile === null &&
    !this.props.profile.loading &&
    this.props.history.push('/not-found');
  }

  render () {
    const { profile, loading } = this.props.profile
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile}/>
          <ProfileAbout profile={profile}/>
          <ProfileCreds profile={profile}/>
          {isEmpty(profile.githubusername) ? null : (
            <ProfileGithub username={profile.githubusername} />
          )}
        </div>
      )
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, { getProfileByHandle, getProfileByUserId })(Profile);
