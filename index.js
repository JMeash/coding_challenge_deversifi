const orders = require('./lib/services/orders');
const config = require('./config');
const cron = require('node-cron');

cron.schedule(`*/${config.timers.master_balance} * * * * *`, () => {
    console.log('running a task every 30s');
});

cron.schedule(`*/${config.timers.bid_refresh} * * * * *`, () => {
    console.log('running a task every 5s');
});