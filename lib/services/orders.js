const {orders} = require('../../config');
const mbService = require('./masterBalance');
const BigNumber = require('bignumber.js');

function placeBids([price, count, amount]) {
    let placed_orders = [];
    for (let i = 0; i < orders.ordersToBePlaced; i++){
        // Place as many order as the assignment says, within a 5% either below or above
        const percent = price * 0.05 * Math.random();
        let order_price = Math.random() > 0.5 ? (price + percent) : (price - percent);
        let order_amount = Math.random() * amount;
        placed_orders.push({price: order_price, amount: order_amount});
        console.log(`PLACED BID 💰 ${order_price} ${order_amount}`);
    }
    return placed_orders;
}

/** Executes all the bids and asks
 *
 * @param best_bids
 * @param asks
 * @param bids
 */
function executeOrders(best_bids, asks, bids) {
    executeAsks(best_bids.best_ask, asks);
    executeBids(best_bids.best_bid, bids);
}

/** Execute the asks that are better than the best_ask
 *
 * @param best_ask {[price, count, amount]}
 * @param asks {[{price , amount}]}
 */
function executeAsks (best_ask, asks){
    let currentMB = mbService.get();
    asks.sort((a, b) => b.price - a.price);
    // Check if we actually have any good asks or we can trade at all
    if(asks[0].price < best_ask[0] || currentMB.eth.isLessThanOrEqualTo(0)){
        return;
    }
    for(let ask of asks){
        // Keep trading if we can
        if (ask.price > best_ask[0] && !currentMB.eth.isLessThanOrEqualTo(0)){
            let sell_amount = new BigNumber(Math.abs(ask.amount)).isGreaterThan(currentMB.eth)
                ? new BigNumber(currentMB.eth)
                : new BigNumber(Math.abs(ask.amount));
            let converted = sell_amount.times(ask.price);
            // Updates the master balance on the processed amounts
            mbService.update('eth', -sell_amount);
            mbService.update('usd', converted);
            console.log(`FILLED BID 🚀 ${ask.price} ${ask.amount} (ETH - ${sell_amount.toFixed(2)} USD + ${converted.toFixed(2)})`)
            currentMB = mbService.get();
        }
    }
}

/** Execute the bids that are better than the best_bid
 *
 * @param best_bid {[price, count, amount]}
 * @param bids {[{price, amount}]}
 */
function executeBids (best_bid, bids){
    let currentMB = mbService.get();
    // Check if we actually have any good asks or we can trade at all
    bids.sort((a, b) => a.price - b.price);
    if(bids[0].price > best_bid[0] || currentMB.usd.isLessThanOrEqualTo(0)){
        return;
    }
    for(let bid of bids){
        // Keep trading if we can
        if (bid.price < best_bid[0] && !currentMB.usd.isLessThanOrEqualTo(0)){
            let amount_usd = new BigNumber(bid.amount).times(bid.price);
            let buy_amount = amount_usd.isGreaterThan(currentMB.usd)
                ? new BigNumber(currentMB.usd)
                : amount_usd;
            let converted = buy_amount.div(bid.price);
            // Updates the master balance on the processed amounts
            mbService.update('usd', -buy_amount);
            mbService.update('eth', converted);
            console.log(`FILLED BID 🚀 ${bid.price} ${bid.amount} (USD - ${buy_amount.toFixed(2)} ETH + ${converted.toFixed(2)})`)
            currentMB = mbService.get();
        }
    }
}


module.exports = {
    placeBids,
    executeOrders,
}