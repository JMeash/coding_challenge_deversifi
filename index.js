const ordersService = require('./lib/services/orders');
const requester = require('./lib/requester');
const mbService = require('./lib/services/masterBalance');
const {timers} = require('./config');
const cron = require('node-cron');

cron.schedule(`*/${timers.master_balance} * * * * *`, () => {
    const masterBalance = mbService.get();
    console.log(`CURRENT BALANCE - ETH:${masterBalance.eth} AND USD:${masterBalance.usd}`);
});

cron.schedule(`*/${timers.bid_refresh} * * * * *`, async () => {
    const best_bids = await requester.getBestBids();
    let orders = ordersService.placeBids(best_bids.best_ask);
    console.log(orders);
});