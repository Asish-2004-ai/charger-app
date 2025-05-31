const express = require('express');
const auth = require('../middleware/auth');
const Charger = require('../models/Charger');
const router = express.Router();

// Protected Routes
router.use(auth);

// Create
router.post('/', async (req, res) => {
  const charger = await Charger.create({ ...req.body, userId: req.user.userId });
  res.status(201).json(charger);
});

// Read All
router.get('/', async (req, res) => {
  const chargers = await Charger.find({ userId: req.user.userId });
  res.json(chargers);
});

// Update
router.put('/:id', async (req, res) => {
  const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(charger);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Charger.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
