const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.userId });
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
