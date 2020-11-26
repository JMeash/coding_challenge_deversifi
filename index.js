const orders = require('./lib/services/orders');
const mbService = require('./lib/services/masterBalance');
const config = require('./config');
const cron = require('node-cron');

cron.schedule(`*/${config.timers.master_balance} * * * * *`, () => {
    const masterBalance = mbService.get();
    console.log(`CURRENT BALANCE - ETH:${masterBalance.eth} AND USD:${masterBalance.usd}`);
});

cron.schedule(`*/${config.timers.bid_refresh} * * * * *`, () => {
    console.log('running a task every 5s');
});