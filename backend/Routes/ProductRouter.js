const express = require('express');
const { ensureAuthenticated } = require('../Middlewares/Auth');
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  upload,
} = require('../Controllers/ProductController');

const router = express.Router();

router.post('/add', ensureAuthenticated, upload.single('image'), createProduct);
router.get('/', ensureAuthenticated, getAllProducts);
router.put('/update/:id', ensureAuthenticated, upload.single('image'), updateProduct);
router.delete('/delete/:id', ensureAuthenticated, deleteProduct);

module.exports = router;
