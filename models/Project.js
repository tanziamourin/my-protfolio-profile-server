import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String, required: true }],
  keywords: [{ type: String }],
  features: { type: String, required: true },
  live: { type: String },
  clientRepo: { type: String },
  serverRepo: { type: String },
  days: { type: Number },
  challenges: { type: String },       // new
  futurePlans: { type: String },      // new
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;



