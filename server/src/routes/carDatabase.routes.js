const router = require('express').Router();
const { getBrands, getModels, getGenerations, getVariations, getChallan } = require('../controllers/carDatabase.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect); // Require auth for these endpoints

router.get('/brands', getBrands);
router.get('/models', getModels);
router.get('/generations', getGenerations);
router.get('/variations/:generation_id', getVariations);
router.post('/challan', getChallan);

module.exports = router;
