import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByRestaurant,
  getPopularMenuItems,
  getCategories
} from '../controllers/menuItemController.js';

const router = express.Router();

// Base routes
router.route('/')
  .get(getAllMenuItems)
  .post(createMenuItem);

router.route('/popular')
  .get(getPopularMenuItems);

router.route('/categories')
  .get(getCategories);

router.route('/restaurant/:restaurantId')
  .get(getMenuItemsByRestaurant);

// ID-specific routes
router.route('/:id')
  .get(getMenuItemById)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

export default router;