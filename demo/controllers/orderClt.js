const {
  db: { user: User, otp: Otp, sequelize, Op, order: Order, product: Product },
} = require('../utils/db');

module.exports = {
  addOrder: async (req, res) => {
    try {
      const { _id } = req.user;
      const { address, productId, phoneNo } = req.body;

      const findProduct = await Product.findAll({
        where: {
          id: {
            [Op.eq]: productId,
          },
        },
      });

      if (findProduct.length > 0) {
        const createOrder = await Order.create({
          Address: address,
          phoneNo,
          productId,
          userId: _id,
          total: findProduct[0].productPrice,
        });
        res.status(200).json({
          success: true,
          data: createOrder,
        });
      } else {
        return res.status(200).json({
          success: false,
          msg: 'product Id doesnot exist',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        err: error,
      });
    }
  },
  getOrdersDetail: async (req, res) => {
    try {
      const OrderDetails = await Order.findAll({
        include: [
          {
            model: User,
            as: 'userDetails',
          },
          {
            model: Product,
            as: 'productDetails',
          },
        ],
      });

      res.status(200).json({
        success: true,
        data: OrderDetails,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        err: error,
      });
    }
  },
};
