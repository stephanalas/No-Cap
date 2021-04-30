const express = require('express');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const registerRouter = require('./registerRouter');
const orderRouter = require('./orderRouter');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);

module.exports = router;
