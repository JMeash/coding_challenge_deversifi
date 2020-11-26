const BigNumber = require('bignumber.js');

const config = {
    diversifi: {
        url: process.env.DIVERSIFI_API_PATH || 'https://api.stg.deversifi.com/bfx/v2/book/',
        symbol: process.env.DIVERSIFI_SYMBOL || 'tETHUSD',
        precision: process.env.DIVERSIFI_PRECISION || 'R0',
    },
    starting_balance: {
        eth: process.env.STARTING_BALANCE_ETH || new BigNumber(10),
        usd: process.env.STARTING_BALANCE_USD || new BigNumber(2000),
    },
    timers: {
        bid_refresh: process.env.TIMERS_BID || 5,
        master_balance: process.env.TIMERS_BALANCE || 30,
    },
    orders: {
        ordersToBePlaced: 5,
    }
}

module.exports = config;