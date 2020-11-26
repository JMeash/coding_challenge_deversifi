const {starting_balance} = require('../../config');
const BigNumber = require('bignumber.js');

const masterBalance = {
    masterBalance: {
        eth: new BigNumber(starting_balance.eth),
        usd: new BigNumber(starting_balance.usd)
    },
    get: function () {
        return this.masterBalance;
    },
    update: function (coin, amount) {
        this.masterBalance[coin] = this.masterBalance[coin].plus(amount);
    }
};

module.exports = masterBalance;