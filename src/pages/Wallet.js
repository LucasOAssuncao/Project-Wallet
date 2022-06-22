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
    const { log, currencies } = this.props;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{log}</h3>
          <h3 data-testid="total-field">0</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <form>
          <input data-testid="value-input" placeholder="despesa" type="text" />
          <input
            data-testid="description-input"
            placeholder="descrição"
            type="text"
          />
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
            >
              {currencies.map((e, index) => (<option key={ index }>{e}</option>))}
            </select>
          </label>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  log: PropTypes.string.isRequired,
  currency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  log: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currency: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
