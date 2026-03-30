const express = require('express');
const Department = require('../models/Department');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

/* PUBLIC GET */
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ADMIN ONLY POST */
router.post(
  '/',
  protect,
  allowRoles('admin'),
  async (req, res) => {
    try {
      const { name } = req.body;

      const deptExists = await Department.findOne({ name });
      if (deptExists) {
        return res.status(400).json({ message: 'Department already exists' });
      }

      const department = new Department({ name });
      await department.save();

      res.status(201).json({ message: 'Department created', department });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;