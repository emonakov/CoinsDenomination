import React, { Component } from 'react';
import logo from './logo.svg';
import CoinsCalculator from './model/calculator';
import Coin from './view/Coin';

/**
 * Main application component
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: null,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Cleans state the component
   *
   * @returns {App}
   */
  cleanState() {
    this.setState({
      coins: null,
      error: null
    });
    return this;
  }

  /**
   *
   *
   * @param event
   * @returns {App}
   */
  handleChange(event) {
    if (event.key === 'Enter') {
    let value = event.target.value || 0;
      if (value === 0) {
        this.cleanState();
      }
      CoinsCalculator(value)
        .then((coins) => {
          this.setState({
            coins: coins,
            error: null
          });
        })
        .catch((e) => {
          if (e.name === 'NotValidError') {
            this.setState({
              coins: null,
              error: e.message
            });
          } else if (e instanceof RangeError) {
            this.setState({
              error: 'Amount is too big',
              coins: null
            });
          } else {
            throw e;
          }
      });
    }
    return this;
  }

  /**
   * Renders initial app view
   *
   * @returns {XML}
   */
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Calculate your change!</h2>
        </div>
        <p className="app-intro">
          <input className={this.state.error ? 'has-error' : ''} type="text" id="amount-input" placeholder="enter £2.5p/2.5p/255" onKeyPress={this.handleChange}/>
          <span className="error">{this.state.error}</span>
        </p>
        <Coin coins={this.state.coins}/>
      </div>
    );
  }
}

export default App;
