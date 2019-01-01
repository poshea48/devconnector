import React from 'react'
import PropTypes from 'prop-types'
import convertDateForDisplay from '../../utils/convertDateForDisplay'

const Education = (props) => {
  let fromDate;
  let toDate = '';
  const education = props.education.map(edu => {
    fromDate = convertDateForDisplay(edu.from)
    if (!edu.current) {
      toDate = convertDateForDisplay(edu.to)
    }
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>{fromDate} - {edu.current ? 'current' : toDate}</td>
        <td>{edu.description}</td>
        <td>
          <button
            data-id={edu._id}
            onClick={props.onDeleteEducation}
            className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    )
  })
  return (
    <div className="container-fluid">
      <h4 className="mb-4">Education Credentials</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>Dates</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {education}
        </tbody>
      </table>
    </div>
  )
}

export default Education
