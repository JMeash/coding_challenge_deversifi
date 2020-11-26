# Coding Exercise: Deversify market bot

This is a small marking bot using Node.js

## Considerations

* After checking the Diversifi documentation, I am assuming that in the API call I am making to diversifi, the 3rd value on each element returned means it is an ask if the value is negative and a bid if positive, therefore only taking those values into account for best ask and bid respectively.
* I also believe the value `price` in the Diversifi API means `1ETH = price`, as that is how I will calculate the value.
* Ideally `orders.js` is a standalone service that has a queue, where it gets feed the bids and it decides on its own, right now I am doing a call in the bot to execute the appropriate sells and bids, so the logic is simplified.

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
