const config = require('../../config');

const masterBalance = {
    masterBalance: {
        eth: config.starting_balance.eth,
        usd: config.starting_balance.usd
    },
    get: function () {
        return this.masterBalance;
    },
    update: function (coin, amount) {
        this.masterBalance[coin] += amount;
    }
};

module.exports = masterBalance;