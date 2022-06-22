import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePersonalForm, fetchAPI } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    lockButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { password, email } = this.state;
    const regexValidation = /\S+@\w+\.\w+/;
    const finalValidation = regexValidation.test(email);
    const rightLenght = 5;
    this.setState({ lockButton: true });
    if (finalValidation && password.length >= rightLenght) {
      this.setState({ lockButton: false });
    }
  }

  handleSubmit = () => {
    const { history, dispatchUser } = this.props;
    const { email } = this.state;
    const profile = {
      email,
    };
    dispatchUser(profile);
    fetchAPI();
    history.push('/carteira');
  }

  render() {
    const { email, password, lockButton } = this.state;
    return (
      <div>
        <form>
          <input
            name="email"
            type="email"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            name="password"
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="button"
            disabled={ lockButton }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (profile) => dispatch(savePersonalForm(profile)),
});

export default connect(null, mapDispatchToProps)(Login);
