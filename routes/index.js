const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create', async (req, res, next) => {
  res.render('create', {})
});

router.get('/items/:itemId', async (req, res, next) => {
  const item = await Item.findOne({_id: req.params.itemId});

  if (!item) {
    res.status(404).send();
  }
  res.render('single', {item: item.toJSON()});
})

router.post('/items/create', async (req, res, next) => {
  const itemTitle = req.body.title;
  const itemDescription = req.body.description;
  const itemImgUrl = req.body.imageUrl;

  const item = new Item({
    title: itemTitle,
    description: itemDescription,
    imageUrl: itemImgUrl
  });

  item.validateSync();

  if(item.errors) {
    res.status(400).render('create', {newItem: item});
  } else {
    await item.save();
    res.redirect('/');
  }
});


module.exports = router;
