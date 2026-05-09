const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Engineering', 'HR', 'Finance', 'Marketing', 'Operations']
  },
  role: {
    type: String,
    required: [true, 'Role is required']
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: 0
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Intern'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);