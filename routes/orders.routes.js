const express = require('express');

const ordersRouter = express.Router();

// Controllers
const {
  createAOrder,
  getAllOrders,
  editOrderStatus,
  cancelOrder,
} = require('../controllers/orders.controller');

// Middlewares
const {
  protectSession,
  verifySameSession,
} = require('../middlewares/auth.middleware');
const { mealExist } = require('../middlewares/mealExist.middleware');
const { orderExist } = require('../middlewares/orderExist.middleware');
const {
  restaurantExist,
} = require('../middlewares/restaurantExist.middleware');
const {
  createOrderValidator,
} = require('../middlewares/validations.middleware');

// Endpoints

ordersRouter.use(protectSession);

ordersRouter.post(
  '/',
  createOrderValidator,
  mealExist,
  restaurantExist,
  createAOrder
);
ordersRouter.get('/me', getAllOrders);
ordersRouter
  .route('/:id')
  .patch(orderExist, verifySameSession, editOrderStatus)
  .delete(orderExist, verifySameSession, cancelOrder);

module.exports = { ordersRouter };
