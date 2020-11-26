# Coding Exercise: Deversify market bot

This is a small marking bot using Node.js.

## Considerations

* After checking the Diversifi documentation, I am assuming that in the API call I am making to diversifi, the 3rd value on each element returned means it is an ask if the value is negative and a bid if positive, therefore only taking those values into account for best ask and bid respectively.
* I also believe the value `price` in the Diversifi API means `1ETH = price`, as that is how I will calculate the value.
* Ideally `orders.js` is a standalone service that has a queue, where it gets feed the bids and it decides on its own, right now I am doing a call in the bot to execute the appropriate sells and bids, so the logic is simplified.

## Fulfilled tasks

1) The bot should keep track of asset balances, starting with a virtual 10 ETH and 2000 USD 
`Done in config.js`
2) Use the orderbook API to determine best bid and best ask prices for the ETH-USD market
`Done in requester.js`
3) The bot should place 5x BID orders and 5x ASK orders at random price points and for random amounts within 5% of the best bid and best ask prices
   placing orders can be done via logging indicating side and price
   e.g. PLACE BID @ PRICE AMOUNT
`Done in placeBids() of orders.js`
4) Every 5 second the bot should refresh (via orderbook API) the state of the market
`Done in index.js as it runs in crons`
5) Any bid orders that are above the best bid or sell orders that are below the best ask should be considered filled and logged accordingly
e.g. FILLED BID @ PRICE AMOUNT (ETH - x.xxx USD + yyyy)
`Done in index.js as it runs in crons, using executeOrders() of orders.js`
6) The bot should keep track of asset balances, updating on filled order events and can place / cancel order positions to fulfil requirements
`Done in masterBalance.js`
7) The bot should show overall asset balances every 30 seconds
`Done in index.js as it runs in crons, using masterBalance.js`

## How to run

Make sure that the dependencies are installed (`npm i`). Then type `npm start`.

## Test it

You can run the battery of integration and unit tests running `npm test`. If you want to run either of them, you can use `npm test integration` 
for the integration tests and `npm test unit` for the unit tests. If running the integration test, allow 6 seconds for the integration test to make sure the crons are working.

## Final Considerations

* Ideally `orders.js` is a standalone service that has a queue, where it gets feed the bids and it decides on its own, right now I am doing a call in the bot to execute the appropriate sells and bids, so the logic is simplified.
* The cron runs every 5 and 30 seconds on the clock (i.e. when the clock is at :30 it will run both).
* The code of `orders` could be easily adapted to add more different coins.
* Because I am not reserving any amount and fullfilling bids and asks to the maximum if possible, the bot will have fully changed the amount of ETH or USD after most of each iteration of trades.
* I have used BigNumber to ensure that I had the needed precision and correct arithmetic. 

## Author

* **José Manuel Medrano Martínez** - [JMeash](https://github.com/JMeash)
