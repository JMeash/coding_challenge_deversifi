const {orders} = require('../../config');

function placeBids([price, count, amount]) {
    let placed_orders = [];
    for (let i = 0; i < orders.ordersToBePlaced; i++){
        const percent = price * 0.05 * Math.random();
        let order_price = Math.random() > 0.5 ? (price + percent) : (price - percent);
        let order_amount = Math.random() * amount;
        placed_orders.push({order_price, order_amount});
        console.log(`PLACE BID @ ${order_price} ${order_amount}`);
    }
    return placed_orders;
}

function executeOrders() {

}

module.exports = {
    placeBids,
    executeOrders,
}