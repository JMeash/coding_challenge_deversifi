const axios = require('axios').default;
const config = require('../config');

async function getBestBids() {
    try {
        const result = await axios.get(`${config.diversifi.url}/${config.diversifi.symbol}/${config.diversifi.precision}`);

        console.log(result);
        if (!result.data) {
            console.log('There was an error in the call to Diversifi and could not get data');
            return;
        }

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