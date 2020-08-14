import React, { Component } from "react";
import Total from "./components/total/Total";
import History from "./components/history/History";
import Operation from "./components/operation/Operation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      description: "",
      amount: "",
    };
  }

  addTransaction = (add) => {
    const transactions = [...this.state.transactions];

    const transaction = {
      id: `cmr${(+new Date()).toString(16)}id`,
      description: this.state.description,
      amount: this.state.amount,
      add,
    };

    transactions.push(transaction);
    this.setState({ transactions, description: "", amount: "" });
  };

  addDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  addAmount = (e) => {
    this.setState({ amount: e.target.value });
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
            <Total />
            <History transactions={this.state.transactions} />
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
