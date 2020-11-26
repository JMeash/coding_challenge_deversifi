# Coding Exercise: Deversify market bot

This is a small marking bot using Node.js

## Considerations

* After checking the Diversifi documentation, I am assuming that in the API call I am making to diversifi, the 3rd parameter on each element returned means it is an ask if the value is negative and a bid if positive, therefore only taking those values into account for best ask and bid respectively.
* Ideally `orders.js` is a standalone service that has a queue, where it gets feed the bids and it decides on its own, right now I am doing a call in the bot to execute the appropriate sells and bids, so the logic is simplified.

## Final Considerations

* Ideally `orders.js` is a standalone service that has a queue, where it gets feed the bids and it decides on its own, right now I am doing a call in the bot to execute the appropriate sells and bids, so the logic is simplified.
* The cron runs every 5 and 30 seconds on the clock (i.e. when the clock is at :30 it will run both).
* I am using `Math.random()`, but it is not cryptographically secure.

## Author

* **José Manuel Medrano Martínez** - [JMeash](https://github.com/JMeash)
