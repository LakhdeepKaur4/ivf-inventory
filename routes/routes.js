const express = require('express');
const router = express.Router();

module.exports = (router) => {
    const itemRoutes = require('./items');
    const brandsRoutes = require('./brands');
    const userRoutes = require('./user');
    const authRoutes = require('./auth');
    const categoryRoutes = require('./category');
    const storesProductmappingRoutes = require('./stores-product-mapping');
    const storesBrandmappingRoutes = require('./stores-brand-mapping');
    const storesCategorymappingRoutes = require('./stores-category-mapping');
    const ordersRoutes = require('./orders');

    router.use('/item', itemRoutes);
    router.use('/brands', brandsRoutes);
    router.use('/user', userRoutes);
    router.use('/auth', authRoutes);
    router.use('/category', categoryRoutes);
    router.use('/map/stores/products', storesProductmappingRoutes);
    router.use('/map/stores/brands', storesBrandmappingRoutes);
    router.use('/map/stores/categories', storesCategorymappingRoutes);
    router.use('/orders', ordersRoutes);
}