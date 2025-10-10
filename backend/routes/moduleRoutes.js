import express from "express";
import Module from "../models/Module.js"; // We now import our 'Module' model

const router = express.Router();

// ROUTE:   POST /api/modules
// DESC:    Create a new Module
router.post("/", async (req, res) => {
  try {
    const { title, description, sections } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // We create a new instance of the 'Module' model
    const newModule = new Module({
      title,
      description,
      sections,
      teacherId: "TEMP_TEACHER_ID_123", 
    });

    // Save the new module to the database
    const savedModule = await newModule.save();

    res
      .status(201)
      .json(savedModule); // It's better to send the saved object back
  } catch (error) {
    res.status(500).json({ message: "Server error creating module", error: error.message });
  }
});

// ROUTE:   GET /api/modules/getAllModules
// DESC:    Get all Modules
router.get("/getAllModules", async (req, res) => {
  try {
    // We use the 'Module' model to find all documents
    const modules = await Module.find({});
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching modules", error: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) return res.status(404).json({ message: 'Module not found' });
        res.status(200).json(module);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ROUTE:   PUT /api/modules/:id
// DESC:    Update an existing Module's title and description
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updatedModule) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.status(200).json(updatedModule);

  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ROUTE:   DELETE /api/modules/:id
// DESC:    Delete a module by its ID
router.delete("/:id", async (req, res) => {

  try {

    const deleteModule = await Module.findByIdAndDelete(req.params.id);

    if (!deleteModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json({ message: "Module deleted successfully" });
    
  } catch (error) {
    console.error("Error deleting module:", error);
    res.status(500).json({ message: "Server error deleting module", error: error.message });
  }

});


export default router;