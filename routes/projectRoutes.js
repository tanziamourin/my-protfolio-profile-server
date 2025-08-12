import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Add a project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    const result = await project.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: "Failed to add project" });
  }
});

// GET single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not Found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.send(projects);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch projects" });
  }
});

// Update a project
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
