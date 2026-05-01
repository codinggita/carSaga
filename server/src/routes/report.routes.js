const router = require('express').Router();
const { createReport, getMyReports, getReportById, getReportByCarId } = require('../controllers/report.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.route('/').get(getMyReports).post(createReport);
router.get('/car/:carId', getReportByCarId);
router.route('/:id').get(getReportById);

module.exports = router;
