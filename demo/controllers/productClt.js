const {
  db: { product: Product, sequelize, Op },
} = require('../utils/db');

module.exports = {
  addProduct: async (req, res) => {
    try {
      const createProduct = Product.create({
        ...req.body,
      });

      res.status(200).json(createProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        err: error,
      });
    }
  },
};
