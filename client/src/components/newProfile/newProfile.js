import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import CommonDropdown from "../common/CommonDropdown";
import { createProfile } from "../../actions/profileActions";

class newProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: "",
      companyName: "",
      website: "",
      location: "",
      skills: "",
      Githubname: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      username: this.state.profileName,
      employer_name: this.state.company,
      website: this.state.website,
      address: this.state.location,
      skills: this.state.skills,
      current_role: this.state.status,
      github: this.state.Githubname
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Student", value: "Student" },
      { label: "Intern", value: "Intern" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="colorgraph" />
              <div className="card padding">
                <h1 className="display-4 text-center">Create Profile</h1>
                <p className="lead text-center">
                  Let's get some information to make your profile stand out
                </p>
                <small className="d-block pb-3">* fields are required</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Enter Profile Name"
                    name="profileName"
                    value={this.state.profileName}
                    onChange={this.onChange}
                    error={errors.profileName}
                    info="This will be a unique name."
                  />
                  <CommonDropdown
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    error={errors.status}
                    info="Select your current position"
                  />
                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Your Company Name"
                  />
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="your website URL"
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="Enter your city name"
                  />
                  <TextFieldGroup
                    placeholder="* Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="HTML,CSS,JavaScript,PHP etc"
                  />
                  <TextFieldGroup
                    placeholder="Github Username"
                    name="Githubname"
                    value={this.state.Githubname}
                    onChange={this.onChange}
                    error={errors.Githubname}
                    info="Enter your GitHub name"
                  />

                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-success btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

newProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(newProfile));
