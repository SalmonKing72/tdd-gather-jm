const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, parseValueFromHTMLInput, seedItemToDatabase, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/update', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders item input fields', async () => {
      const testItem = await seedItemToDatabase({
        description: "My favorite item", 
        imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
        title: "69 Camaro SS"
      });

      const response = await request(app)
        .get(`/items/${testItem._id}/update`)
        .send();

      assert.equal(parseValueFromHTMLInput(response.text, 'input#title-input'), testItem.title);
      assert.equal(parseValueFromHTMLInput(response.text, 'input#imageUrl-input'), testItem.imageUrl);
      assert.equal(parseValueFromHTMLInput(response.text, 'textarea#description-input'), testItem.description);
      
    });
  });

  describe('POST', () => {
    it('updates a single item in database and redirects to the main view', async () => {
      const itemOptions = {
        description: "My favorite item", 
        imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
        title: "69 Camaro SS"
      };
      const updateItemInput = buildItemObject({
        description: "My favorite car", 
        imageUrl: "https://i.ytimg.com/vi/Ud1wq0lx1oY/hqdefault.jpg",
        title: "69 Camaro SS Black"
      })
      const testItem = await seedItemToDatabase(itemOptions);

      const response = await request(app)
        .post(`/items/${testItem._id}/update`)
        .type('form')
        .send(updateItemInput);

      const updatedItem = await Item.findOne(testItem._id)
      
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
      assert.isNotNull(updatedItem, 'item is not in the database');
      assert.equal(updatedItem.title, updateItemInput.title);
      assert.equal(updatedItem.description, updateItemInput.description);
      assert.equal(updatedItem.imageUrl, updateItemInput.imageUrl);
    });
  
    // it('displays an error message for an item with no title.', async () => {
    // const invalidItemToCreate = {
    //     description: 'test',
    //     imageUrl: 'https://www.placebear.com/200/300',
    // };

    // const response = await request(app)
    //     .post('/items/create')
    //     .type('form')
    //     .send(invalidItemToCreate);

    // const items = await Item.find({});

    // assert.equal(items.length, 0);
    // assert.strictEqual(response.status, 400);
    // assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    // });

    // it('displays an error message for an item with no description.', async () => {
    // const invalidItemToCreate = {
    //     title: 'test',
    //     imageUrl: 'https://www.placebear.com/200/300',
    // };

    // const response = await request(app)
    //     .post('/items/create')
    //     .type('form')
    //     .send(invalidItemToCreate);

    // const items = await Item.find({});

    // assert.equal(items.length, 0);
    // assert.strictEqual(response.status, 400);
    // assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    // })

    // it('displays an error message for an item with no image url.', async () => {
    // const invalidItemToCreate = {
    //     title: 'test',
    //     description: 'test description'
    // };

    // const response = await request(app)
    //     .post('/items/create')
    //     .type('form')
    //     .send(invalidItemToCreate);

    // const items = await Item.find({});

    // assert.equal(items.length, 0);
    // assert.strictEqual(response.status, 400);
    // assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    // })
  })
});
