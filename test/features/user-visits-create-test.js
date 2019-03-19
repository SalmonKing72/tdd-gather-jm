const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('User visits create item page', () => {
    describe('posts a new item', () => {
        it('renders the newly created item', () => {
            let item = buildItemObject("My favorite item", "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg", "69 Camaro SS");
            browser.url('/create.html');
            browser.setValue('#title-input', item.title);
            browser.setValue('#description-input', item.description);
            browser.setValue('#imageUrl-input', item.imageUrl);
            browser.click('#submit-button');

            assert.include(browser.getText('body'), item.title);
            assert.include(browser.getAttribute('body img', 'src'), item.imageUrl);
        })
    })
})
