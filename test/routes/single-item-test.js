const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders a single item and its fields', async () => {
      const testItem = seedItemToDatabase({
        description: "My favorite item", 
        imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
        title: "69 Camaro SS"
      });

      const response = await request(app)
        .get(`/items/${testItem._id}`)
        .send();
      
      assert.include(parseTextFromHTML(response.text, '#item-title'), testItem.title);
      assert.include(parseTextFromHTML(response.description, '#item-description'), testItem.description);
    })
  })
});
