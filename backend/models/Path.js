// backend/models/Path.js
// --- UPGRADED FOR MULTIPLE FILE TYPES ---
import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  
  contentType: { 
    type: String, 
    required: true,
    enum: ['PDF', 'PPT', 'WORD'],
  },
  
  contentUrl: { type: String, required: true }, 
});


const pathSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    teacherId: { type: String, required: true },
    modules: [moduleSchema], 
  },
  {
    timestamps: true,
  }
);

const Path = mongoose.model('Path', pathSchema);

export default Path;