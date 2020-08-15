import React, { Component } from "react";
import Total from "./components/total/Total";
import History from "./components/history/History";
import Operation from "./components/operation/Operation";
import HistoryItem from "./components/history/HistoryItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: JSON.parse(localStorage.getItem("calcMoney")) || [],
      description: "",
      amount: "",
      resultIncome: 0,
      resultExpenses: 0,
      totalBalance: 0,
    };
  }

  componentWillMount() {
    this.getTotalBalance();
  }

  componentWillUpdate() {
    this.addStorage();
  }
  addTransaction = (add) => {
    const transactions = [
      ...this.state.transactions,
      {
        id: `cmr${(+new Date()).toString(16)}id`,
        description: this.state.description,
        amount: parseFloat(this.state.amount),
        add,
      },
    ];

    this.setState(
      {
        transactions,
        description: "",
        amount: "",
      },
      this.getTotalBalance
    );
  };

  addDescription = (e) => this.setState({ description: e.target.value });

  addAmount = (e) => this.setState({ amount: e.target.value });

  getIncome = () =>
    this.state.transactions.reduce(
      (acc, item) => (item.add ? item.amount + acc : acc),
      0
    );
  getExpenses = () =>
    this.state.transactions.reduce(
      (acc, item) => (!item.add ? item.amount + acc : acc),
      0
    );

  // getIncome() {
  //   return this.state.transactions
  //     .filter((item) => item.add)
  //     .reduce((acc, item) => item.amount + acc, 0);
  // }

  // getExpenses() {
  //   return this.state.transactions
  //     .filter((item) => !item.add)
  //     .reduce((acc, item) => item.amount + acc, 0);
  // }

  getTotalBalance() {
    const resultIncome = this.getIncome();
    const resultExpenses = this.getExpenses();

    const totalBalance = resultIncome - resultExpenses;

    this.setState({
      resultIncome,
      resultExpenses,
      totalBalance,
    });
  }

  addStorage() {
    localStorage.setItem("calcMoney", JSON.stringify(this.state.transactions));
  }

  deleteHistoryItem = (id) => {
    const transactions = this.state.transactions.filter(
      (item) => item.id !== id
    );
    this.setState({ transactions }, this.getTotalBalance);
  };

  render() {
    return (
      <>
        <header>
          <h1>Кошелек</h1>
          <h2>Калькулятор расходов</h2>
        </header>

        <main>
          <div className="container">
            <Total
              resultExpenses={this.state.resultExpenses}
              resultIncome={this.state.resultIncome}
              totalBalance={this.state.totalBalance}
            />
            <History
              transactions={this.state.transactions}
              deleteHistoryItem={this.deleteHistoryItem}
            />
            <Operation
              addTransaction={this.addTransaction}
              addDescription={this.addDescription}
              addAmount={this.addAmount}
              description={this.state.description}
              amount={this.state.amount}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
