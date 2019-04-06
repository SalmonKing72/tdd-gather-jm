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
  describe('item\'s title field', () => {
    it('should be a string', async () => {
      const testTitle = 3;

      const item = await Item.create({title: testTitle});

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
  })
});
