import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Latest Resume' },
    url: { type: String, required: true },
    publicId: String,
    resourceType: { type: String, default: 'raw' },
    downloads: { type: Number, default: 0 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
