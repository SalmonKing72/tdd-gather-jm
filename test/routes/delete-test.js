const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('POST', () => {
    it('deletes a single item from view and database', async () => {
      const itemOptions = {
        description: "My favorite item", 
        imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
        title: "69 Camaro SS"
      };

      const testItemInput = buildItemObject(itemOptions);
      const testItem = await seedItemToDatabase(itemOptions);

      const response = await request(app)
        .post(`/items/${testItem._id}/delete`)
        .type('form')
        .send(testItemInput);

      const deletedItem = await Item.findById(testItem._id)
      
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
      assert.isNull(deletedItem, 'item was not deleted from the database');
    })
  })
});
