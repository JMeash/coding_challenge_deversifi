const requester = require('../lib/requester');
const mbService =  require('../lib/services/masterBalance');
const orders =  require('../lib/services/orders');
const axios = require('axios');
const BigNumber = require('bignumber.js');

jest.mock("axios");

describe('requester', function () {
    it('should return the highest ask and lowest bid', async function () {
        axios.get.mockImplementation(() => Promise.resolve({data: [[90, 1, -5], [80, 1, -5], [110, 1, 5], [100, 1, 5]]}));
        const result = await requester.getBestBids();
        expect(result).toMatchObject({
            best_ask: [90, 1, -5],
            best_bid: [100, 1, 5]
        });
    });
    it('should throw error if API call fails', async function () {
        try {
            axios.get.mockImplementation(() => Promise.reject({statusCode: 500, error: 'Error'}));
            const result = await requester.getBestBids();
        } catch (e) {
            expect(e).toStrictEqual(new Error('There was an error in the call to Diversifi and could not get a response'));
        }
    });
});

describe('master balance', function () {
    it('should start with the default amount', function () {
        expect(mbService.masterBalance.eth.toFixed()).toBe('10');
        expect(mbService.masterBalance.usd.toFixed()).toBe('2000');
    });
    it('should update if given the correct coin', function () {
        mbService.update('eth', -2);
        expect(mbService.masterBalance.eth.toFixed()).toBe('8');
        expect(mbService.masterBalance.usd.toFixed()).toBe('2000');
    });
    it('should error on non existent coins', function () {
        expect(() => mbService.update('lol', -2)).toThrow();
        expect(mbService.masterBalance.eth.toFixed()).toBe('8');
        expect(mbService.masterBalance.usd.toFixed()).toBe('2000');
    });
    it('should return the updated amounts', function () {
        const result = mbService.get();
        expect(result.eth.toFixed()).toBe('8');
        expect(result.usd.toFixed()).toBe('2000');
    });
});

describe('orders', function () {
    let consoleSpy = jest.spyOn(console, 'log');
    const result = orders.placeBids([100, 1, 5]);
    it('should place 5 bids and print them', function () {
        expect(consoleSpy).toHaveBeenCalledTimes(5);
    });
    it('should not be over or below 5%', function () {
        for (let i = 0; i < 5; i++){
            expect(result[i].price).toBeGreaterThanOrEqual(95);
            expect(result[i].price).toBeLessThanOrEqual(105);
        }
    });
    it('should execute asks and bids if it is a good price', function () {
        orders.executeOrders({
            best_bid: [100, 5, 1],
            best_ask: [90, 5, 1],
        }, [
            {price: 105, amount: -0.5},
            {price: 85, amount: -0.5},
        ],[
            {price: 105, amount: 0.5},
            {price: 95, amount: 0.5},
        ]);
        expect(consoleSpy).toHaveBeenCalledTimes(7);
    });
    it('should NOT execute asks and bids if no funds', function () {
        mbService.masterBalance.eth = new BigNumber(0);
        mbService.masterBalance.usd = new BigNumber(0);
        orders.executeOrders({
            best_bid: [100, 5, 1],
            best_ask: [90, 5, 1],
        }, [
            {price: 105, amount: -0.5},
            {price: 85, amount: -0.5},
        ],[
            {price: 105, amount: 0.5},
            {price: 95, amount: 0.5},
        ]);
        expect(consoleSpy).toHaveBeenCalledTimes(7);
    });
});




