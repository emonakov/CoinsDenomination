import React, { Component } from 'react';

/**
 * React component for coins list
 */
export default class Coin extends Component {
  /**
   * Renders the rendered output for coins change
   *
   * @returns {XML}
   */
  render() {
    let coinMap = (this.props.coins) ? Object.keys(this.props.coins).reverse() : [];
    return (
      <div className="coins-container">
        {coinMap.length > 0 &&
          <div className="change-title" >
            <h2>This is your change</h2>
          </div>
        }
        {
          coinMap.map((coin) => {
            let amt = this.props.coins[coin];
            return (
              <div key={coin} data={amt} className="coins">
                <p>{coin} x {amt}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}