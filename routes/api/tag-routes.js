const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: 'tags' }
      ]
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: 'tags' }
      ]
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return { product_id: product.id, tag_id };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });

    if (updatedRows > 0) {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return { product_id: req.params.id, tag_id };
          });
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        await Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags)
        ]);
      }

      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ message: 'No product found with this id' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedRows = await Product.destroy({
      where: { id: req.params.id }
    });

    if (deletedRows > 0) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'No product found with this id' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;





// const router = require('express').Router();
// const { Tag, Product, ProductTag } = require('../../models');

// // The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// router.post('/', (req, res) => {
//   // create a new tag
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

// module.exports = router;
