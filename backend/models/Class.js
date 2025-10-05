// backend/models/Class.js
// --- CORRECTED WITH 'ref' PROPERTY ---

import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
    },
    // We now tell Mongoose that this ID refers to the 'User' model.
    teacherId: {
      type: String,
      required: true,
      ref: 'User' 
    },
    // We do the same for the array of student IDs.
    studentIds: [{ 
      type: String, 
      ref: 'User' 
    }],
    // And for modules, for future use.
    assignedModuleIds: [{ 
      type: String, 
      ref: 'Module' 
    }],
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model('Class', classSchema);

export default Class;