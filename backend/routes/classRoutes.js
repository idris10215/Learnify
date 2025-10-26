// backend/routes/classRoutes.js

import express from 'express';
import Class from '../models/Class.js';

// We will also need our other models to do the 'lookup'
import User from '../models/User.js'; 
import Module from '../models/Module.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singleClass = await Class.findById(req.params.id)
      // Populate the teacher's details, but only get their username
      .populate('teacherId', 'username')
      // Populate the students' details
      .populate('studentIds', 'username email')
      // Populate the details of the assigned modules
      .populate('assignedModuleIds', 'title description');

    if (!singleClass) return res.status(404).json({ message: 'Class not found' });
    
    res.status(200).json(singleClass);

  } catch (error) {
    console.error("Error fetching single class:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ROUTE:   PUT /api/classes/:classId/assign-module
// DESC:    Assign a module to a specific class
router.put('/:classId/assign-module', async (req, res) => {
  try {
    const { moduleId } = req.body; // Get the module ID from the request
    const { classId } = req.params;

    // Find the class by its ID
    const targetClass = await Class.findById(classId);
    if (!targetClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Add the new module ID to the 'assignedModuleIds' array
    // We'll also check to prevent adding duplicates
    if (!targetClass.assignedModuleIds.includes(moduleId)) {
      targetClass.assignedModuleIds.push(moduleId);
    }

    // Save the updated class document
    await targetClass.save();

    // Populate the data again to send a fresh, complete response
    const updatedClass = await Class.findById(classId)
        .populate('studentIds', 'username email')
        .populate('assignedModuleIds', 'title');

    res.status(200).json(updatedClass);

  } catch (error) {
    console.error("Error assigning module:", error);
    res.status(500).json({ message: 'Server error' });
  }
});



// ROUTE:   GET /api/classes/student/:studentId
// DESC:    Get all classes a specific student is enrolled in
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all classes where the 'studentIds' array contains the student's ID.
    const studentClasses = await Class.find({ studentIds: studentId })
        .populate('teacherId', 'username'); // Also fetch the teacher's name for each class

    res.status(200).json(studentClasses);

  } catch (error) {
    console.error("Error fetching student's classes:", error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/teacher/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    // Find classes where the teacherId matches
    const teacherClasses = await Class.find({ teacherId: teacherId });
    res.status(200).json(teacherClasses);
  } catch (error) {
    console.error("Error fetching teacher's classes:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;