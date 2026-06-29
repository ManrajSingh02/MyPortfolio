import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: String,
    startYear: { type: String, required: true },
    endYear: { type: String, required: true },
    score: String,
    description: String,
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Education', educationSchema);
