const axios = require('axios').default;
const {diversifi} = require('../config');

/** Retrieves from Diversifi API the current best bids and best asks and returns them in an object
 *
 *
 * @returns {Promise<{best_bid: ([price, count, amount]), best_ask: [price, count, amount]}>}
 */
async function getBestBids() {
    try {
        const result = await axios.get(`${diversifi.url}/${diversifi.symbol}/${diversifi.precision}`);
        if (!result.data) {
            console.log('There was an error in the call to Diversifi and could not get data');
            return;
        }

        // The data gets reduced into two different arrays, depending if it is a bid or an ask (positive or negative amount)
        // Then sorts the best one
        const best_bid = result.data.reduce((a, b) => {
            if (a[2] > 0 && b[2] > 0){
                return a[0] < b[0] ? a : b
            } else {
                return a[2] > 0 ? a : b
            }
        });
        const best_ask = result.data.reduce((a, b) => {
            if (a[2] < 0 && b[2] < 0){
                return a[0] > b[0] ? a : b
            } else {
                return a[2] < 0 ? a : b
            }
        });

        return {
            best_bid: best_bid[2] > 0 ? best_bid : {},
            best_ask: best_ask[2] < 0 ? best_ask : {},
        }
    } catch (e) {
        throw new Error('There was an error in the call to Diversifi and could not get a response');
    }
}

module.exports = {
    getBestBids,
}