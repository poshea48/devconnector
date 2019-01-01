import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, deleteExperience, deleteEducation } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';


class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    e.preventDefault();
    this.props.deleteAccount();
  }

  onDeleteExperience = e => {
    e.preventDefault();
    this.props.deleteExperience(e.target.dataset.id)
  }

  onDeleteEducation = e => {
    e.preventDefault();
    this.props.deleteEducation(e.target.dataset.id)
  }

  render () {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Checked if logged in user has profile data
      if (isEmpty(profile)) {
        // User is logged in but no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      } else {
        dashboardContent = (
          <div className="profile-content">
            <p className="lead text-muted">
              Welcome <Link to={`/profile/handle/${profile.handle}`}>{ user.name }</Link>
            </p>
            <ProfileActions />

            <Experience experiences={profile.experience} onDeleteExperience={this.onDeleteExperience}/>
            <div style={{ marginBottom: '60px' }} />
            <Education education={profile.education} onDeleteEducation={this.onDeleteEducation}/>

            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteExperience, deleteEducation, deleteAccount })(Dashboard);
