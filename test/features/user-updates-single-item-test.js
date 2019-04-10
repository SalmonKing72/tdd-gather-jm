const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User vists create item page.', () => {
    describe('posts a new item.', () => {
        it('updates the item', () => {
            let itemToUpdate = buildItemObject({
                description: "An item to update",
                imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
                title: "Bad Fruit"
            });
            browser.url('/items/create');
            browser.setValue('#title-input', itemToUpdate.title);
            browser.setValue('#description-input', itemToUpdate.description);
            browser.setValue('#imageUrl-input', itemToUpdate.imageUrl);
            browser.click('#submit-button');

            browser.click('.item-card a');
            
            browser.click('#update-button');
        })
    })
})