const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });

  describe('to create a new item', () => {
    it('provides a form to create a new item', () => {
      browser.url('/');
      browser.click('a[href="create.html"]');
      assert.include(browser.getText('h2[id="page-title"]'), 'Create');
    })
  })
});
