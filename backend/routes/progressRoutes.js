// backend/routes/progressRoutes.js

import express from 'express';
import StudentProgress from '../models/StudentProgress.js';
import Class from '../models/Class.js';
import User from '../models/User.js';

const router = express.Router();

// ROUTE:   POST /api/progress/mark-complete
// DESC:    Mark a section as complete for a student in a specific module/class
router.post('/mark-complete', async (req, res) => {
  try {
    const { studentId, moduleId, classId, sectionId } = req.body;

    // Find the student's progress document for this module, or create it if it doesn't exist.
    let progress = await StudentProgress.findOne({ studentId, moduleId, classId });

    if (!progress) {
      progress = new StudentProgress({ studentId, moduleId, classId, completedSections: [] });
    }

    // Add the sectionId to the completed list if it's not already there.
    if (!progress.completedSections.includes(sectionId)) {
      progress.completedSections.push(sectionId);
    }

    await progress.save();
    res.status(200).json(progress);

  } catch (error) {
    console.error("Error marking section as complete:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// backend/routes/progressRoutes.js
// ... (imports and POST route)

// ROUTE:   GET /api/progress/:studentId/:moduleId/:classId
// DESC:    Get a student's progress for a specific module in a class
router.get('/:studentId/:moduleId/:classId', async (req, res) => {
    try {
        const { studentId, moduleId, classId } = req.params;
        const progress = await StudentProgress.findOne({ studentId, moduleId, classId });
        if (!progress) {
            return res.status(404).json({ message: 'Progress not found for this module.' });
        }
        res.status(200).json(progress);
    } catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


// ROUTE:   GET /api/progress/class/:classId
// DESC:    Get aggregated progress for all students in a class
router.get('/class/:classId', async (req, res) => {
  try {
    const { classId } = req.params;

    // 1. Find the class to get student list and module list
    const targetClass = await Class.findById(classId).populate('assignedModuleIds', 'title sections'); // Get module details too
    if (!targetClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // 2. Find all progress records specifically for this class
    const allProgress = await StudentProgress.find({ classId: classId })
      .populate('studentId', 'username'); // Get student names

    // 3. (Optional but helpful) Process the data into a more useful format for the frontend
    const report = targetClass.studentIds.map(studentId => {
      // Find the specific student's details (needed if studentIds isn't populated above)
      // Note: This assumes studentIds contains full user objects after populate or separate fetch
      // If studentIds only contains IDs, you'd need another populate or lookup
      
      // Find all progress records for THIS student in THIS class
      const studentProgressRecords = allProgress.filter(p => p.studentId._id.toString() === studentId.toString()); // Compare IDs as strings

      // Calculate completion for each assigned module
      const moduleProgress = targetClass.assignedModuleIds.map(module => {
        const progressRecord = studentProgressRecords.find(p => p.moduleId.toString() === module._id.toString());
        const totalSections = module.sections.length;
        const completedSections = progressRecord ? progressRecord.completedSections.length : 0;
        const completionPercentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
        
        return {
            moduleId: module._id,
            moduleTitle: module.title,
            completed: completedSections,
            total: totalSections,
            percentage: Math.round(completionPercentage)
        };
      });

      // Find student name (Requires studentIds to be populated or another lookup)
      // This is a simplified lookup assuming studentIds were populated
       const studentInfo = allProgress.find(p => p.studentId._id.toString() === studentId.toString())?.studentId;


      return {
        studentId: studentId, // Keep the ID
        studentName: studentInfo ? studentInfo.username : 'Unknown Student', // Get the name
        modules: moduleProgress
      };
    });
    
    // Correct lookup for student names if studentIds are just strings
     const studentDetails = await User.find({ '_id': { $in: targetClass.studentIds } }).select('username');
     const studentMap = studentDetails.reduce((map, user) => {
        map[user._id.toString()] = user.username;
        return map;
     }, {});

    const finalReport = targetClass.studentIds.map(studentIdString => {
        const studentProgressRecords = allProgress.filter(p => p.studentId._id.toString() === studentIdString);
         const moduleProgress = targetClass.assignedModuleIds.map(module => {
            const progressRecord = studentProgressRecords.find(p => p.moduleId.toString() === module._id.toString());
            const totalSections = module.sections.length;
            const completedSections = progressRecord ? progressRecord.completedSections.length : 0;
            const completionPercentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
            
            return {
                moduleId: module._id,
                moduleTitle: module.title,
                completed: completedSections,
                total: totalSections,
                percentage: Math.round(completionPercentage)
            };
        });
        
        return {
            studentId: studentIdString,
            studentName: studentMap[studentIdString] || 'Unknown Student',
            modules: moduleProgress
        };
    });


    res.status(200).json(finalReport);

  } catch (error) {
    console.error("Error fetching class progress report:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;