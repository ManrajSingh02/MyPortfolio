import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    organization: { type: String, required: true },
    issueDate: { type: Date, required: true },
    credentialUrl: String,
    image: { url: String, publicId: String },
    pdf: { url: String, publicId: String, resourceType: String },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Certificate', certificateSchema);
