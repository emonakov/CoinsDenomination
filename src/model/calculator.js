import NotValidError from '../errors/NotValidError';

/**
 * Coins object
 *
 * @type {{200: number, 100: number, 50: number, 20: number, 10: number, 5: number, 2: number, 1: number}}
 */
const CoinsByAmount = {
  200: '£2',
  100: '£1',
  50: '50p',
  20: '20p',
  10: '10p',
  5: '5p',
  2: '2p',
  1: '1p'
};

/**
 * Entry point to calculate coins amount
 *
 * @param num
 * @returns {Promise}
 */
export default function coinsCalculator(num) {
  return new Promise(function (resolve) {
    // matching data with valid pattern and returns matches
    let matchData = isValidNum(num);
    // calculating pennies amount
    let penny = getPennySum(matchData);
    // getting amount of coins based on coins object
    let coinsAmount = amountToCoins(penny, Object.keys(CoinsByAmount).reverse());
    // adjust result to return output
    let coinsOutput = {};
    for (let coin in coinsAmount) {
      if (coinsAmount.hasOwnProperty(coin)) {
        coinsOutput[CoinsByAmount[coin]] = coinsAmount[coin];
      }
    }
    resolve(coinsOutput);
  });
}

/**
 * Gets penny sum for the input
 *
 * @param data
 * @returns {*}
 */
function getPennySum(data) {
  if (data.poundSign || data.tenthsNum) {
    return (data.fullNum * 100).toFixed(0);
  } else {
    return data.fullNum;
  }
}

/**
 * Checks if valid input by regexp and returns matching object
 *
 * @param num
 * @returns {{poundSign: *, fullNum: *, tenthsNum: *}}
 */
function isValidNum(num) {
  num = num.toString();
  let reg = /^(£)?(\d+(\.?\d+)?)(p)?$/;
  let isValid = reg.test(num);
  let matches = num.match(reg);
  if (matches) {
    let poundSign = matches[1];
    let fullNum = matches[2];
    let tenthsNum = matches[3];
    let pennySign = matches[4];
    if (poundSign && pennySign && !tenthsNum) {
      throw new NotValidError();
    }
    if (isValid) {
      return {
        poundSign:poundSign,
        fullNum: fullNum,
        tenthsNum: tenthsNum
      };
    }
  }
  throw new NotValidError();
}

/**
 * Returns penny coin denominations with number of coins
 *
 * @param amount
 * @param coins
 * @returns {*}
 */
function amountToCoins(amount, coins) {
  let results = {};
  let currentCoin;
  // Init of counter, to hold index of coin
  let x = 0;
  // While the number of pennies != 0
  while (amount) {
    // Get the next coin from currency array
    currentCoin = +coins[x++];
    // If the coin is smaller/equal to the current number of pennies
    if (amount >= currentCoin) {
      let numberCoins = numberOfCoins(amount, currentCoin);
      if (numberCoins === 0) continue;
      results[currentCoin] = numberCoins;
      amount = remainingPennies(amount, currentCoin);
    }
  }
  return results;
}

/**
 * Calculates the number of whole coins which can divide into an amount of pennies.

 * @param {float} pennies
 * @param {int} coin
 * @return {int}
 */
function numberOfCoins (pennies, coin) {
  return Math.floor(pennies / coin);
}

/**
 * Calculates the number of remaining pennies, using modulus.

 * @param {float} pennies
 * @param {int} coin
 * @return {int}
 */
function remainingPennies (pennies, coin) {
  return pennies % coin;
}