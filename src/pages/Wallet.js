import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, saveExpenses, saveId } from '../actions';
import {
  REQUEST_API,
  SUBMIT_EXCHANGES,
  RAISE_ID,
} from '../actions/actionTypes';

const alimentacao = 'Alimentação';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
  };

  componentDidMount() {
    const { currency } = this.props;
    currency();
    // exchange();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  exportState = async () => {
    const { waste, setID, id } = this.props;
    // const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all').then((results) => results.json());
    // this.setState({ exchangeRates });
    const exported = {
      ...this.state,
      // exchangeRates,
      id,
    };
    waste(exported);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
    setID(RAISE_ID);
  };

  render() {
    const { log, currencies, expenses } = this.props;
    const { description, method, value, tag, currency } = this.state;
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{log}</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
          <p data-testid="total-field">
            {!expenses
              ? 0
              : expenses
                .reduce((acc, curr) => {
                  acc += curr.exchangeRates[curr.currency].ask * curr.value;
                  return acc;
                }, 0)
                .toFixed([2])}
          </p>
        </header>
        <form>
          <input
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="despesa"
            type="text"
            onChange={ this.handleChange }
          />
          <input
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="descrição"
            type="text"
            onChange={ this.handleChange }
          />
          <label htmlFor="moeda">
            Moeda
            <select
              name="currency"
              value={ currency }
              id="moeda"
              onChange={ this.handleChange }
            >
              {currencies.map((e, index) => (
                <option key={ index }>{e}</option>
              ))}
            </select>
          </label>
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button onClick={ this.exportState } type="button">
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  log: PropTypes.string.isRequired,
  currency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  waste: PropTypes.func.isRequired,
  // exchange: PropTypes.func.isRequired,
  // exchangeRates: PropTypes.objectOf.isRequired,
  setID: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.user.email,
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchange,
  id: state.wallet.id,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  waste: (state) => dispatch(saveExpenses(state)),
  currency: () => dispatch(fetchAPI(REQUEST_API)),
  exchange: () => dispatch(fetchAPI(SUBMIT_EXCHANGES)),
  setID: (type) => dispatch(saveId(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
