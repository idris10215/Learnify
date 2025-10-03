import mongoose from "mongoose";

// This is the blueprint for a SINGLE Section within a Module.
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  contentType: {
    type: String,
    required: true,
    enum: ["PDF", "PPT", "WORD"],
  },
  contentUrl: { type: String, required: true },
});

// The main blueprint is now for a Module.
const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    teacherId: { type: String, required: true },
    // A Module is now defined by an array of these Sections.
    sections: [sectionSchema],
  },
  {
    timestamps: true,
  }
);

// We create and export the 'Module' model.
const Module = mongoose.model("Module", moduleSchema);

export default Module;
