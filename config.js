const BigNumber = require('bignumber.js');

const config = {
    diversifi: {
        url: process.env.DIVERSIFI_API_PATH || 'https://api.stg.deversifi.com/bfx/v2/book/',
        symbol: process.env.DIVERSIFI_SYMBOL || 'tETHUSD',
        precision: process.env.DIVERSIFI_PRECISION || 'R0',
    },
    starting_balance: {
        eth: new BigNumber(10),
        usd: new BigNumber(2000),
    },
    timers: {
        bid_refresh: 5,
        master_balance: 30,
    },
    orders: {
        ordersToBePlaced: 5,
    }
}

module.exports = config;