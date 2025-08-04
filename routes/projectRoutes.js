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

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.send(projects);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch projects" });
  }
});

export default router;
