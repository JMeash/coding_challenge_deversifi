const index = require('../index');
jest.setTimeout(10000);

describe('index', function () {
    it('after 6 seconds we will have placed bids and some executed bids', async function (done) {
        let consoleSpy = jest.spyOn(console, 'log');
        setTimeout(async () => {
            expect(consoleSpy).toHaveBeenCalled();
            done();
        }, 6000);
    });
});