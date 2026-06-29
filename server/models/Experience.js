import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    type: { type: String, default: 'Internship' },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);
