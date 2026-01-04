const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  tasks: [
    {
      title: { type: String, required: true },
      status: { type: String, enum: ['done', 'pending', 'warning'], default: 'pending' },
    },
  ],
});

module.exports = mongoose.model('Task', TaskSchema);
