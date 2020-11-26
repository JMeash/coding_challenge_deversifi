const {starting_balance} = require('../../config');

const masterBalance = {
    masterBalance: {
        eth: starting_balance.eth,
        usd: starting_balance.usd
    },
    get: function () {
        return this.masterBalance;
    },
    update: function (coin, amount) {
        this.masterBalance[coin] += amount;
    }
};

module.exports = masterBalance;