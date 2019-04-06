const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('Item\'s title field', () => {
    it('should be a string', async () => {
      const testTitle = 3;

      const item = await Item.create({
        title: testTitle,
        description: 'test',
        imageUrl: 'test'
      });

      assert.strictEqual(testTitle.toString(), item.title);
    });

    it('should be required', async () => {
      const invalidItem = new Item({
        title: null,
        description: 'testing invalid item',
        imageUrl: 'https://www.placebear.com/200/300'
      });

      invalidItem.validateSync();

      assert.equal(invalidItem.errors.title.message, 'Path `title` is required.');
    })
  });

  describe('Item\'s description field', () => {
    it('should be a string', async () => {
      const testDescription = 3;

      const item = await Item.create({
        title: 'test',
        description: testDescription,
        imageUrl: 'test'
      });

      assert.strictEqual(testDescription.toString(), item.description);
    });

    it('should be required', async () => {
      const invalidItem = new Item({
        title: 'test',
        description: null,
        imageUrl: 'https://www.placebear.com/200/300'
      });

      invalidItem.validateSync();

      assert.equal(invalidItem.errors.description.message, 'Path `description` is required.');
    });
  });

  describe('Item\'s image url field', () => {
    it('should be a string', async () => {
      const testUrl = 3;

      const item = await Item.create({
        title: 'test',
        description: 'test',
        imageUrl: testUrl
      });

      assert.strictEqual(testUrl.toString(), item.imageUrl);
    });

    it('should be required', async () => {
      const invalidItem = new Item({
        title: 'test',
        description: 'test',
        imageUrl: null
      });

      invalidItem.validateSync();

      assert.equal(invalidItem.errors.imageUrl.message, 'Path `imageUrl` is required.');
    });
  });
});
