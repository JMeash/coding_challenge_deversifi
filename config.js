const config = {
    diversifi: {
        url: process.env.DIVERSIFI_API_PATH || 'https://api.stg.deversifi.com/bfx/v2/book/',
        symbol: process.env.DIVERSIFI_SYMBOL || 'tETHUSD',
        precision: process.env.DIVERSIFI_PRECISION || 'R0',
    },
    starting_balance: {
        eth: 10.0,
        usd: 2000.0,
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