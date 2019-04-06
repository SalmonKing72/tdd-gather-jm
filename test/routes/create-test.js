const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/items/create')
        .send();

      assert.equal(parseTextFromHTML(response.text, 'input#title-input').length, 0);
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input').length, 0);
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input').length, 0);
      
    });
  });

  describe('POST', () => {
    it('create a new item and persists it', async () => {
      const itemToCreate = buildItemObject();

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);

      let createdItem = await Item.findOne(itemToCreate);
      assert.isNotNull(createdItem, 'the item was not created in the database');
    });

    it('redirects to the main view', async () => {
      const itemToCreate = buildItemObject();
      
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);

      assert.strictEqual(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

    it('displays an error message for an item with no title.', async () => {
      const invalidItemToCreate = {
        description: 'test',
        imageUrl: 'https://www.placebear.com/200/300',
      };

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItemToCreate);

      const items = await Item.find({});

      assert.equal(items.length, 0);
      assert.strictEqual(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('displays an error message for an item with no description.', async () => {
      const invalidItemToCreate = {
        title: 'test',
        imageUrl: 'https://www.placebear.com/200/300',
      };

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItemToCreate);

      const items = await Item.find({});

      assert.equal(items.length, 0);
      assert.strictEqual(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })

    it('displays an error message for an item with no image url.', async () => {
      const invalidItemToCreate = {
        title: 'test',
        description: 'test description'
      };

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItemToCreate);

      const items = await Item.find({});

      assert.equal(items.length, 0);
      assert.strictEqual(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
  });
});
