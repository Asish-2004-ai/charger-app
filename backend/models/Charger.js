const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  powerOutput: Number,
  connectorType: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Charger', chargerSchema);
