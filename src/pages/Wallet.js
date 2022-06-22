import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currency } = this.props;
    currency();
  }

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
  currency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.user.email,
  // currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currency: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
