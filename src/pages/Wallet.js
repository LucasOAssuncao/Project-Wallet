import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { log } = this.props;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ log }</h3>
          <h3 data-testid="total-field">0</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  log: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
