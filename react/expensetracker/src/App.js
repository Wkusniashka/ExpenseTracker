import React from 'react';
import './style.css';

import Products from './components/Products';
import Header from './components/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: Number(localStorage.getItem('income')),
      expense: Number(localStorage.getItem('expense')),
      balance: Number(localStorage.getItem('balance')),
      products: this.parseProductsInLocalStorage()
    };
  }

  parseProductsInLocalStorage() {
    const localStorageParsed = JSON.parse(localStorage.getItem('products'));
    return !!localStorageParsed ? localStorageParsed : [];
  }

  render() {
    const { income, expense, balance, products } = this.state;
    let balanceCol;
    balance >= 0 ? balanceCol = "green" : balanceCol = "red";
    const handleIncomeChange = (event) => {
      localStorage.setItem('income', Number(event.target.value));
      localStorage.setItem('balance', Number(event.target.value) - expense)
      this.setState({
        income: localStorage.getItem('income'),
        balance: localStorage.getItem('balance')

      });
    }
    const addExpense = () => {
      let name = document.getElementById('itemName').value;
      let price = Number(document.getElementById('itemPrice').value);
      if (name !== "" && price !== 0) {
        products.push({ name: name, price: price, date: new Date() });
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('expense', expense + price)
        localStorage.setItem('balance', localStorage.getItem('income') - (expense + price));

        this.setState({
          expense: expense + price,
          balance: income - (expense + price)
        });
        document.getElementById('itemName').value = "";
        document.getElementById('itemPrice').value = "";
      }
    }
    const deleteProduct = (index, price) => {
      let products = JSON.parse(localStorage.getItem('products'))

      localStorage.setItem('expense', Number(localStorage.getItem('expense')) - price)
      localStorage.setItem('balance', localStorage.getItem('balance') + price);
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      this.setState({
        products: products,
        expense: expense - price,
        balance: balance + price
      });
    }

    const clearStorageHandler = () => {
      localStorage.setItem('products', JSON.stringify([]));
      localStorage.setItem('expense', 0)
      localStorage.setItem('balance', 0);
      localStorage.setItem('income', 0);
      this.setState({
        income: Number(localStorage.getItem('income')),
        expense: Number(localStorage.getItem('expense')),
        balance: Number(localStorage.getItem('balance')),
        products: []
      });
    }

    return (
      <>
        <div className="App">
          <h1 style={{ color: "rgb(17, 101, 117)" }}>Expense Tracker</h1>
          <Header
            income={income}
            expense={expense}
          />
          <p>Total balance: <b style={{ color: balanceCol }}>{balance}</b></p>
          <p>Total monthly income</p>
          <input type="number" onChange={handleIncomeChange} placeholder="Enter Your Income"></input>
          <form onSubmit={addExpense}>
            <p>Item</p>
            <input type="text" id="itemName" placeholder="Item Name" required></input>
            <p>Price</p>
            <input type="number" id="itemPrice" placeholder="Item Price" required></input>
            <button type="submit" className="buttonClass">Add Expense</button>
          </form>
        </div>
        <Products
          delete={deleteProduct}
          items={products}
          clear={clearStorageHandler}
          
        />
      </>
    );
  }
}

export default App;
