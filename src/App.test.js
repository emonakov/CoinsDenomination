import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CoinsCalculator from './model/calculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
it('returns valid change numbers', (done) => {
  const promise = CoinsCalculator(256);
  promise.then((coins) => {
    done(coins);
  });
});
it('returns invalid response', (done) => {
  const promise = CoinsCalculator('£1p');
  promise.catch((e) => {
    if (e.name === 'NotValidError') {
      done(e);
    }
  });
});
it('returns £2 x 32 coins', (done) => {
  const promise = CoinsCalculator('£64');
  promise.then((coins) => {
    if (coins['£2'] === 32) {
      done();
    }
  });
});