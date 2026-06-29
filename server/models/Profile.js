import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema(
  {
    linkedin: String,
    github: String,
    instagram: String,
    leetcode: String,
    codechef: String
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: 'MCA Student' },
    photo: { url: String, publicId: String },
    bio: { type: String, required: true },
    careerObjective: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    typingRoles: [{ type: String }],
    socials: socialSchema
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
