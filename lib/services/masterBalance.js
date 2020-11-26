const {starting_balance} = require('../../config');
const BigNumber = require('bignumber.js');

// Keep a centralized master balance to avoid duplication and errors
const masterBalance = {
    masterBalance: {
        eth: new BigNumber(starting_balance.eth),
        usd: new BigNumber(starting_balance.usd)
    },
    // Returns the master balance
    get: function () {
        return this.masterBalance;
    },
    // Updates based on coin and amount
    update: function (coin, amount) {
        this.masterBalance[coin] = this.masterBalance[coin].plus(amount);
    }
};

module.exports = masterBalance;