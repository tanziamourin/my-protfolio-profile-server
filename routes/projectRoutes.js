import express from "express";
import { getDB } from "../config/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const db = await getDB();
  const result = await db.collection("projects").insertOne(req.body);
  res.send(result);
});

router.get("/", async (req, res) => {
  const db = await getDB();
  const projects = await db.collection("projects").find().sort({ _id: -1 }).toArray();
  res.send(projects);
});

export default router;