import React from 'react'
import PropTypes from 'prop-types'
import convertDateForDisplay from '../../utils/convertDateForDisplay'
const Experience = (props) => {
  let fromDate;
  let toDate = '';
  const experiences = props.experiences.map(exp => {
    fromDate = convertDateForDisplay(exp.from)
    if (!exp.current) {
      toDate = convertDateForDisplay(exp.to)
    }
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>{fromDate} - {exp.current ? 'current' : toDate}</td>
        <td>{exp.description}</td>
        <td>
          <button
            data-id={exp._id}
            onClick={props.onDeleteExperience}
            className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    )
  })
  return (
    <div className="container-fluid">
      <h4 className="mb-4">Experience Credentials</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Location</th>
            <th>Dates</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </div>
  )
}

export default Experience
