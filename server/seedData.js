const mongoose = require('mongoose');
const Employee = require('./models/Employee');
require('dotenv').config();

const sampleEmployees = [
  { name: 'Priya Sharma',  email: 'priya@csir.in',  department: 'Engineering', role: 'Senior Developer',    salary: 75000, status: 'Active' },
  { name: 'Arjun Mehta',   email: 'arjun@csir.in',  department: 'HR',          role: 'HR Manager',          salary: 60000, status: 'Active' },
  { name: 'Sunita Rao',    email: 'sunita@csir.in', department: 'Finance',     role: 'Analyst',             salary: 55000, status: 'Active' },
  { name: 'Vikram Singh',  email: 'vikram@csir.in', department: 'Marketing',   role: 'Marketing Lead',      salary: 65000, status: 'Active' },
  { name: 'Neha Patel',    email: 'neha@csir.in',   department: 'Engineering', role: 'Software Intern',     salary: 15000, status: 'Intern' },
  { name: 'Rahul Das',     email: 'rahul@csir.in',  department: 'Operations',  role: 'Ops Manager',         salary: 70000, status: 'Active' },
  { name: 'Kavya Nair',    email: 'kavya@csir.in',  department: 'Engineering', role: 'QA Intern',           salary: 12000, status: 'Intern' },
  { name: 'Amit Joshi',    email: 'amit@csir.in',   department: 'Finance',     role: 'Senior Analyst',      salary: 80000, status: 'Active' },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Employee.deleteMany({});
    await Employee.insertMany(sampleEmployees);
    console.log('✅ Sample data added successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });