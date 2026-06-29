import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    category: { type: String, default: 'Web App', index: true },
    githubUrl: String,
    liveUrl: String,
    image: { url: String, publicId: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });

export default mongoose.model('Project', projectSchema);
