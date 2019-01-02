import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios'

class ProfileGithub extends React.Component {
  constructor(props) {
    super(props);
    // this.githublist = React.createRef();
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    console.log(this.props.username)
    axios.get(`/api/profile/github/${this.props.username}`)
      .then(res => {
        if (this.refs.myRef) {
          this.setState({ repos: res.data.repos })
        }
      })
      .catch(err => console.log(err))
  }

  render () {
    const { repos } = this.state
    let repoList = repos.map((repo, i) => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoList}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub;
