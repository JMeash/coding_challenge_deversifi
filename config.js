const config = {
    diversifi: {
        url: process.env.DIVERSIFI_API_PATH || 'https://api.stg.deversifi.com/bfx/v2/book/',
        symbol: process.env.DIVERSIFI_SYMBOL || 'tETHUSD',
        precision: process.env.DIVERSIFI_PRECISION || 'R0',
    }
}

module.exports = config;