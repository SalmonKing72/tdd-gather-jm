const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User vists create item page.', () => {
    describe('posts a new item.', () => {
        it('views the newly created item.', () => {
            let item = buildItemObject({description: "My single item", 
                imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg", 
                title: "Another Camaro"
            });
            browser.url('/items/create');
            browser.setValue('#title-input', item.title);
            browser.setValue('#description-input', item.description);
            browser.setValue('#imageUrl-input', item.imageUrl);
            browser.click('#submit-button');

            browser.click('.item-card a');
            assert.include(browser.getText('body'), item.description);
        })
    })
})