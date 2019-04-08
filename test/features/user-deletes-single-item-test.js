const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User vists create item page.', () => {
    describe('posts a new item.', () => {
        it('deletes the item', () => {
            let item = buildItemObject("An item to delete", "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg", "Bad Fruit");
            browser.url('/items/create');
            browser.setValue('#title-input', item.title);
            browser.setValue('#description-input', item.description);
            browser.setValue('#imageUrl-input', item.imageUrl);
            browser.click('#submit-button');

            browser.click('.delete-form');
            assert.notInclude(browser.getText('body'), item.description);
        })
    })
})