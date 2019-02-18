import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import Avatar from '../shared/avatar';
import SweetAlert from '../shared/sweetAlert';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      college: '',
      phone: '',
      picture: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { picture } = this.state;
    const { register } = this.props;
    if (picture !== '') {
      SweetAlert('Submitting your form!', 'success');
      register(this.state);
    } else {
      SweetAlert('Please choose an Avatar.', 'error');
    }
  };

  changeAvatar = (avatar) => {
    this.setState({ picture: avatar });
  }

  render() {
    const {
      college, phone, username, picture,
    } = this.state;
    return (
      <div className="row black-text">
        <h4>
          Fill out your basic details.
        </h4>
        <div className="row">
          {this.state.picture === '' ? (
            <p>
              No Image Provided
            </p>
          ) : (
            <img src={picture} className="circle responsive-img" alt="img" width="100" />
          )}
        </div>
        <a className="waves-effect waves-light btn modal-trigger grey darken-3" href="#modal0">
          <i className="material-icons left">
            cloud
          </i>
          Choose your Avatar
        </a>
        <div id="modal0" className="modal">
          <div className="modal-content">
            <div className="row">
              <h4>
                Select your avatar
                <i className="material-icons right modal-close">
                  cancel
                </i>
              </h4>
            </div>
            <Avatar onSelectAvatar={this.changeAvatar} />
          </div>
        </div>

        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">
                account_balance
              </i>
              <input name="college" id="college" type="text" value={college} className="validate" onChange={this.onChange} required />
              <label htmlFor="college">
                College/Institution Name
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">
                phone
              </i>
              <input name="phone" id="phone" type="number" value={phone} className="validate" onChange={this.onChange} required />
              <label htmlFor="phone">
                Phone Number
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">
                account_circle
              </i>
              <input name="username" id="username" type="text" value={username} className="validate" onChange={this.onChange} required />
              <label htmlFor="username">
                Username
              </label>
            </div>
          </div>
          <button className="modal-close btn waves-effect waves-light grey darken-3" type="submit">
            Submit
            <i className="material-icons right">
              send
            </i>
          </button>
        </form>
      </div>
    );
  }
}

Form.defaultProps = {
  register: () => null,
};

Form.propTypes = {
  register: () => null,
};

const mapStateToProps = state => ({
  loggedin: state.user.loggedin,
  registered: state.user.registered,
  onboard: state.user.registered,
  userData: state.user.userData,
});

const mapDispatchToProps = dispatch => ({
  register: (formData) => {
    dispatch(actions.onboard(formData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
