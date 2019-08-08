const express = require('express');
const router = express.Router();

module.exports = (router) => {
    const itemRoutes = require('./items');
    const brandsRoutes = require('./brands');
    const userRoutes = require('./user');
    const authRoutes = require('./auth');
    const categoryRoutes = require('./category')

    router.use('/item',itemRoutes);
    router.use('/brands',brandsRoutes);
    router.use('/user',userRoutes);
    router.use('/auth',authRoutes);
    router.use('/category',categoryRoutes);
}