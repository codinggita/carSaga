const Report = require('../models/Report.model');
const Car = require('../models/Car.model');

// GET /api/analytics/compare?car1=&car2=
exports.compareCars = async (req, res, next) => {
  try {
    const { car1, car2 } = req.query;
    const [carA, carB] = await Promise.all([
      Car.findById(car1),
      Car.findById(car2),
    ]);
    if (!carA || !carB) return res.status(404).json({ message: 'One or both cars not found' });

    const [reportA, reportB] = await Promise.all([
      Report.findOne({ car: car1 }).sort({ createdAt: -1 }),
      Report.findOne({ car: car2 }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      car1: { car: carA, report: reportA },
      car2: { car: carB, report: reportB },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/analytics/summary
exports.getUserSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const totalCars = await Car.countDocuments({ owner: userId });
    const verified = await Car.countDocuments({ owner: userId, status: 'verified' });
    const flagged = await Car.countDocuments({ owner: userId, status: 'flagged' });
    const pending = await Car.countDocuments({ owner: userId, status: 'pending' });

    // Risk distribution
    const lowRisk = await Car.countDocuments({ owner: userId, riskLevel: 'low' });
    const medRisk = await Car.countDocuments({ owner: userId, riskLevel: 'medium' });
    const highRisk = await Car.countDocuments({ owner: userId, riskLevel: 'high' });

    // Monthly verification activity (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const cars = await Car.find({ owner: userId, createdAt: { $gte: sixMonthsAgo } }).select('createdAt');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCounts = {};
    cars.forEach((c) => {
      const d = new Date(c.createdAt);
      const key = months[d.getMonth()];
      monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
    });

    // Build array for chart
    const now = new Date();
    const monthlyChecks = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const name = months[d.getMonth()];
      monthlyChecks.push({ name, checks: monthlyCounts[name] || 0 });
    }

    // Total reports generated
    const totalReports = await Report.countDocuments({ generatedBy: userId });

    res.status(200).json({
      totalCars,
      verified,
      flagged,
      pending,
      safeToBuy: verified,
      riskDistribution: { low: lowRisk, medium: medRisk, high: highRisk },
      monthlyChecks,
      totalReports,
    });
  } catch (err) {
    next(err);
  }
};
