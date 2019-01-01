import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: []
  //   }
  // }
  componentDidMount() {
    this.props.getProfiles()
  }

  render () {
    const { profiles, loading } = this.props.profile
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />
    } else {
      if(profiles.length > 0) {
        profileItems = profiles.map((profile, i) => {
          return (
            <ProfileItem key={i} profile={profile} />
          )
        })
      } else {
        profileItems = <h4>No profiles found</h4>
      }

    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <ul className="list-unstyled">
                {profileItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, {getProfiles})(Profiles);
