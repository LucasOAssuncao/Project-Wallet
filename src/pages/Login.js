import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            name="username"
            type="email"
            data-testid="email-input"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            data-testid="password-input"
            placeholder="Senha"
          />
        </form>
      </div>
    );
  }
}

export default Login;
