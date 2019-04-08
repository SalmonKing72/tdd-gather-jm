const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('POST', () => {
    it('deletes a single item from view and database', async () => {
      const testItem = await seedItemToDatabase({
        description: "My favorite item", 
        imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
        title: "69 Camaro SS"
      });

      const response = await request(app)
        .get(`/items/${testItem._id}/delete`)
        .send();
      
      assert.equal(response.status, 200);
      assert.notInclude(parseTextFromHTML(response.text, '#item-title'), testItem.title);
      assert.notInclude(parseTextFromHTML(response.text, '#item-description'), testItem.description);
    })
  })
});
