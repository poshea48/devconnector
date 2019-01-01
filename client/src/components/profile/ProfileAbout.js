import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../validation/is-empty'

class ProfileAbout extends React.Component {

  render () {
    const { profile } = this.props
    const skillSet = profile.skills.map((skill, i) => (
      <div key={i} className="p-3">
        <i className="fa fa-check"></i> {skill}
      </div>
    ))
    const firstName = profile.user.name.split(' ')[0]
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{`${firstName}'s`} Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (<span>{firstName} does not have a Bio</span>) : (<span>{profile.bio}</span>)}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skillSet}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout;
