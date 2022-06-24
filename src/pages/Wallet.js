import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, saveExpenses, saveId, removeExpense } from '../actions';
import {
  REQUEST_API,
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
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  exportState = async () => {
    const { waste, setID, id } = this.props;
    const exported = {
      ...this.state,
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
    const { log, currencies, expenses, removeExpenses } = this.props;
    const { description, method, value, tag, currency } = this.state;
    return (
      <div className="wallet-father">
        <header className="wallet-header">
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
        <form className="wallet-form">
          <input
            className="Input-text-wallet"
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="despesa"
            type="text"
            onChange={ this.handleChange }
          />
          <input
            className="Input-text-wallet"
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
              className="Input-text-wallet"
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
            className="Input-text-wallet"
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
            className="Input-text-wallet"
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
          <button onClick={ this.exportState } type="button" className="button-30">
            Adicionar despesa
          </button>
        </form>
        <div className="table-father">
          <table>
            <tr className="wallet-tr1">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {expenses.map(
              (
                {
                  description: desc,
                  tag: tg,
                  method: meth,
                  value: val,
                  exchangeRates,
                  currency: cur,
                  id,
                },
              ) => (
                <tr key={ id } className="wallet-tr2">
                  <td>{desc}</td>
                  <td>{tg}</td>
                  <td>{meth}</td>
                  <td>{Number(val).toFixed(2)}</td>
                  <td>{exchangeRates[cur].name.split('/')[0]}</td>
                  <td>{Number(exchangeRates[cur].ask).toFixed(2)}</td>
                  <td>{(exchangeRates[cur].ask * val).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button type="button">
                      <i className="ph-pencil-simple-line" />
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => removeExpenses(id) }
                    >
                      <i className="ph-trash-simple" />
                    </button>
                  </td>
                </tr>
              ),
            )}
          </table>
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  log: PropTypes.string.isRequired,
  currency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  waste: PropTypes.func.isRequired,
  setID: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  removeExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.user.email,
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.expenses.exchangeRates,
  id: state.wallet.id,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  waste: (state) => dispatch(saveExpenses(state)),
  currency: () => dispatch(fetchAPI(REQUEST_API)),
  setID: (type) => dispatch(saveId(type)),
  removeExpenses: (param) => dispatch(removeExpense(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
