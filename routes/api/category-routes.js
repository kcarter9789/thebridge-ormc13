const router = require('express').Router();
const { json } = require('sequelize');
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
      include:[{model:Product}]
    })
    .then(categories=>{
      res.status(200).json(categories);
    })
    .catch(error=>{
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params?.id,{
    include: [{ model: Product }]
  })
  .then(category => {
    if(category) {
      return res.status(200).json(category);
    }
    return res.status(404).json({ message: `Category with id - ${req.params?.id} not found` });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.post('/', (req, res) => {
  // create a new category
  console.log(req.body?.category_name);
  Category.create({
    category_name: req.body?.category_name
  })
  .then(category => {
    res.status(201).json(category);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const {id} = req.params;
  const {category_name} = req.body;
  
  Category.update({
    category_name:category_name
    },
    {
      where: {
        id:id
      }
    })
    .then(updated => {
      if (updated[0] === 0) {
        return res.status(303).json({ message: `Category with id - ${id} not modified.` });
      }
      return res.status(200).json({info: "record updated"});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;

  Category.findByPk(id, {
    include: [{ model: Product }],
  })
    .then((category) => {
      if (category) {
        // Extract product ids
        const productIds = category.products.map((product) => product.id);

        // Delete product tags associated with the products
        ProductTag.destroy({
          where: {
            product_id: productIds,
          },
        })
          .then(() => {
            // Delete the products
            Product.destroy({
              where: {
                id: productIds,
              },
            })
              .then((deletedProducts) => {
                if (deletedProducts === 0) {
                  console.log('Products not deleted', JSON.stringify(productIds, null, 2));
                }

                // Delete the category
                Category.destroy({
                  where: {
                    id: id,
                  },
                })
                  .then((deletedCategory) => {
                    if (deletedCategory === 0) {
                      return res.status(303).json({ message: `Category with id - ${id} not deleted.` });
                    }
                    return res.status(204).end();
                  })
                  .catch((error) => {
                    res.status(500).json(error);
                  });
              })
              .catch((error) => {
                res.status(500).json(error);
              });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      } else {
        return res.status(404).json({ message: `Category with id - ${id} not found.` });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});


module.exports = router;
