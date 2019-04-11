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

router.get('/items/:itemId/update', async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('update', {item});
});

router.get('/items/:itemId', async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);

  if (!item) {
    res.status(404).send();
  }
  res.render('single', {item: item.toJSON()});
})

router.post('/items/:itemId/delete', async (req, res, next) => {
  await Item.deleteOne({_id: req.params.itemId}, async function (error) {
    const items = await Item.find({});
    if (error) {
      res.status(400).render('index', {items})
    }
    res.redirect('/');
  });
});

router.post('/items/:itemId/update', async (req, res, next) => {
  const updatedItemObj = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  };

  const item = new Item(updatedItemObj);
  item.validateSync();

  if(item.errors) {
    res.status(400).render('create', {newItem: item});
  } else {
    await Item.updateOne({_id: req.params.itemId}, updatedItemObj, {omitUndefined: true});
    res.redirect('/');
  }
});

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
