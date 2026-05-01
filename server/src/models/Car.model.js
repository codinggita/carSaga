const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vin: { type: String, required: true, uppercase: true, trim: true, maxlength: 17 },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    mileage: { type: Number, default: 0 },
    photos: [{ type: String }], // Array of upload paths / URLs
    status: { type: String, enum: ['pending', 'verified', 'flagged'], default: 'pending' },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    location: { type: String, default: '' },
    brandImage: { type: String, default: '' },
    challanStatus: {
      totalChallan: { type: Number, default: 0 },
      statusMessage: { type: String, default: '' },
      result: { type: mongoose.Schema.Types.Mixed, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
