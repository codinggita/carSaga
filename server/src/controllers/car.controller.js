const Car = require('../models/Car.model');
const Report = require('../models/Report.model');

// Simulate AI-generated report data based on car info
const generateReportData = (car) => {
  const riskScores = { low: 90, medium: 72, high: 45 };
  const overallScore = riskScores[car.riskLevel] || 85;

  const issues = car.riskLevel === 'low'
    ? [
        { location: 'Battery', type: 'Health at 91%', severity: 'cosmetic', estimatedRepairCost: 0 },
        { location: 'Tyres', type: '65% tread remaining', severity: 'cosmetic', estimatedRepairCost: 10000 },
      ]
    : car.riskLevel === 'medium'
    ? [
        { location: 'Brakes', type: 'Pads at 40%', severity: 'moderate', estimatedRepairCost: 6000 },
        { location: 'Suspension', type: 'Minor play detected', severity: 'moderate', estimatedRepairCost: 12000 },
        { location: 'AC Compressor', type: 'Reduced cooling', severity: 'cosmetic', estimatedRepairCost: 8000 },
      ]
    : [
        { location: 'Engine', type: 'Oil leak detected', severity: 'critical', estimatedRepairCost: 25000 },
        { location: 'Transmission', type: 'Gear slip under load', severity: 'critical', estimatedRepairCost: 45000 },
        { location: 'Frame', type: 'Rust damage', severity: 'moderate', estimatedRepairCost: 18000 },
      ];

  const baseYear = car.year || 2023;
  const maintenanceForecast = [
    { year: `${baseYear + 1}`, estimatedCost: 8000 },
    { year: `${baseYear + 2}`, estimatedCost: 12000 },
    { year: `${baseYear + 3}`, estimatedCost: 18000 },
    { year: `${baseYear + 4}`, estimatedCost: 15000 },
    { year: `${baseYear + 5}`, estimatedCost: 35000 },
  ];

  const mileageOptions = ['~12,500 km', '~22,310 km', '~35,800 km', '~48,000 km', '~65,200 km'];
  const odometerEstimate = mileageOptions[Math.floor(Math.random() * mileageOptions.length)];

  return {
    overallScore,
    riskLevel: car.riskLevel,
    issues,
    maintenanceForecast,
    vehicleSpecs: {
      previousOwners: Math.floor(Math.random() * 3) + 1,
      odometerEstimate,
    },
    summary: `${car.year} ${car.make} ${car.model} — AI verification complete. Overall condition scored ${overallScore}/100 with ${issues.length} findings. Risk level: ${car.riskLevel}.`,
    challanData: {
      totalChallan: car.challanStatus?.totalChallan || 0,
      statusMessage: car.challanStatus?.statusMessage || 'Not checked',
    },
  };
};

// POST /api/cars
exports.createCar = async (req, res, next) => {
  try {
    const car = await Car.create({ ...req.body, owner: req.user.id });

    // Auto-generate a report for the new car
    const reportData = generateReportData(car);
    const report = await Report.create({
      car: car._id,
      generatedBy: req.user.id,
      ...reportData,
    });

    res.status(201).json({ car, report });
  } catch (err) {
    next(err);
  }
};

// GET /api/cars
exports.getMyCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};

// GET /api/cars/:id
exports.getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

// PUT /api/cars/:id
exports.updateCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/cars/:id
exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    // Also delete associated reports
    await Report.deleteMany({ car: req.params.id });
    res.status(200).json({ message: 'Car and associated reports removed' });
  } catch (err) {
    next(err);
  }
};
