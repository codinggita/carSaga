const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  location: { type: String, required: true },
  type: { type: String, required: true },
  severity: { type: String, enum: ['cosmetic', 'moderate', 'critical'], default: 'cosmetic' },
  estimatedRepairCost: { type: Number, default: 0 },
});

const reportSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    overallScore: { type: Number, min: 0, max: 100, default: 0 },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    issues: [issueSchema],
    maintenanceForecast: [
      {
        year: { type: String },
        estimatedCost: { type: Number },
      },
    ],
    vehicleSpecs: {
      previousOwners: { type: Number, default: 0 },
      odometerEstimate: { type: String, default: '' },
    },
    summary: { type: String, default: '' },
    challanData: {
      totalChallan: { type: Number, default: 0 },
      statusMessage: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
