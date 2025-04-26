const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Add task
router.post('/', async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title, userId: req.user.id });
  await newTask.save();
  res.status(201).json(newTask);
});

// Update task
router.put('/:id', async (req, res) => {
  const { title, completed } = req.body;
  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, completed },
    { new: true }
  );
  res.json(updatedTask);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
