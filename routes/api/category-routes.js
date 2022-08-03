const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],

    include: [
      {
        model: Product,
        attributes: [
          'id', 'product_name', 'price', 'inventory_stock'
        ]
      }
    ]
  }).then(dbCategoryData => res.json(dbCategoryData)).catch(err => {
    console.log(err);
    res.status(500),json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
      attributes: [
        'id', 'product_name', 'price', 'inventory_stock'
      ]
      }
    ]
  }).then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No category exists with this id.'});
      return;
    }
    res.json(dbCategoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

// create a new category
router.post('/', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  }).then(dbCategoryData => res.json(dbCategoryData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No category exists with this id.'});
      return;
    }
    res.json(dbCategoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No category exists with this id.'});
      return;
    }
    res.json(dbCategoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
