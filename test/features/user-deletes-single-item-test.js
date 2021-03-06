const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User vists create item page.', () => {
    describe('posts a new item.', () => {
        it('deletes the item', () => {
            let itemToDelete = buildItemObject({
                description: "An item to delete",
                imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
                title: "Bad Fruit"
            });
            browser.url('/items/create');
            browser.setValue('#title-input', itemToDelete.title);
            browser.setValue('#description-input', itemToDelete.description);
            browser.setValue('#imageUrl-input', itemToDelete.imageUrl);
            browser.click('#submit-button');

            browser.click('.delete-form p');
            assert.include(browser.getText('body'), itemToDelete.title);
        })
    })
})