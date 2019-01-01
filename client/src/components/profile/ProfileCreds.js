import React from 'react'
import PropTypes from 'prop-types'
import convertDateForDisplay from '../../utils/convertDateForDisplay';


class ProfileCreds extends React.Component {

  render () {
    const { profile } = this.props
    const experiences = profile.experience.map((exp, i) => (
      <li key={i} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          {convertDateForDisplay(exp.from)} - {exp.current ? 'Current' : convertDateForDisplay(exp.to)}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        <p>
          {exp.location === '' ? null :
            (<span><strong>Location: </strong>{exp.location}</span>)
          }
        </p>
        <p>
          {exp.description === '' ? null :
            (<span><strong>Description: </strong>{exp.description}</span>)
          }
        </p>
      </li>
    ))
    const education = profile.education.map((edu, i) => (
      <li key={i} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          {convertDateForDisplay(edu.to)} - {edu.current ? 'Current' : convertDateForDisplay(edu.to)}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === '' ? null :
            (<span><strong>Description: </strong>{edu.description}</span>)
          }
        </p>
      </li>
    ))
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experiences.length > 0 ? (
            <ul className="list-group">
              {experiences}
            </ul>
          ) : (
            <p className="text-center">No experiences listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {education.length > 0 ? (
            <ul className="list-group">
              {education}
            </ul>
          ) : (
            <p className="text-center">No education listed</p>
          )}

        </div>
      </div>
    )
  }
}

export default ProfileCreds;
