const ordersService = require('./lib/services/orders');
const requester = require('./lib/requester');
const mbService = require('./lib/services/masterBalance');
const {timers} = require('./config');
const cron = require('node-cron');

// Executes every by default every 30s, shows the current balance
cron.schedule(`*/${timers.master_balance} * * * * *`, () => {
    const masterBalance = mbService.get();
    // I have added a fixed of 2 decimals so it easier to read, but it means some small transactions will show as 0.00
    console.log(`CURRENT BALANCE 💸 ETH:${masterBalance.eth.toFixed(2)} AND USD:${masterBalance.usd.toFixed(2)}`);
});

// Executes every by default every 5s, places and executes orders
cron.schedule(`*/${timers.bid_refresh} * * * * *`, async () => {
    const best_bids = await requester.getBestBids();
    let asks = ordersService.placeBids(best_bids.best_ask);
    let bids = ordersService.placeBids(best_bids.best_bid);
    ordersService.executeOrders(best_bids, asks, bids);
});