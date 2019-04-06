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
      assert.isNotNull(createdItem, 'the item was not created in the database')
    });
  });
});
