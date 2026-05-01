const Report = require('../models/Report.model');

// POST /api/reports
exports.createReport = async (req, res, next) => {
  try {
    const report = await Report.create({ ...req.body, generatedBy: req.user.id });
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
};

// GET /api/reports
exports.getMyReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ generatedBy: req.user.id }).populate('car').sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/:id
exports.getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id).populate('car');
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/car/:carId
exports.getReportByCarId = async (req, res, next) => {
  try {
    const report = await Report.findOne({ car: req.params.carId }).sort({ createdAt: -1 }).populate('car');
    if (!report) return res.status(404).json({ message: 'Report not found for this car' });
    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};
