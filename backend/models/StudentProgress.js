// backend/models/StudentProgress.js

import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  // Link to the student
  studentId: {
    type: String,
    ref: 'User',
    required: true,
  },
  // Link to the module
  moduleId: {
    type: String,
    ref: 'Module',
    required: true,
  },
  // Link to the class this is happening in
  classId: {
    type: String,
    ref: 'Class',
    required: true,
  },
  // A list of the IDs of the sections the student has completed
  completedSections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module.sections' // A reference to a specific section within a module
  }],
  // We can add more fields here later, like quiz scores
  quizScore: {
    type: Number,
  },
}, { timestamps: true });

const StudentProgress = mongoose.model('StudentProgress', progressSchema);

export default StudentProgress;