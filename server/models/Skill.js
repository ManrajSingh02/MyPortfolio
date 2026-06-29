import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 1, max: 100 },
    category: { type: String, enum: ['technical', 'soft', 'tool'], default: 'technical' },
    icon: String,
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
