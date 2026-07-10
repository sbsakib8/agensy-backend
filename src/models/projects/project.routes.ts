import express from "express";
import {
  // Category management
  createProjectCategory,
  getAllProjectCategories,
  getProjectCategoryById,
  updateProjectCategory,
  deleteProjectCategory,
  // Project management
  addProjectToCategory,
  updateProjectInCategory,
  removeProjectFromCategory
} from "./project.controller";
import { verifyToken, requireAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

// Public routes for project categories
router.get("/", getAllProjectCategories);
router.get("/categories/:id", getProjectCategoryById);

// Admin-only routes for project categories
router.post("/categories", verifyToken, requireAdmin, createProjectCategory);
router.put("/categories/:id", verifyToken, requireAdmin, updateProjectCategory);
router.patch("/categories/:id", verifyToken, requireAdmin, updateProjectCategory);
router.delete("/categories/:id", verifyToken, requireAdmin, deleteProjectCategory);

// Admin-only routes for project management within categories
router.post("/categories/:categoryId", verifyToken, requireAdmin, addProjectToCategory);
router.put(
  "/:projectId/categories/:categoryId",
  verifyToken,
  requireAdmin,
  updateProjectInCategory,
);
router.patch("/categories/:categoryId/projects/:projectId", verifyToken, requireAdmin, updateProjectInCategory);
router.delete("/:projectId/categories/:categoryId", verifyToken, requireAdmin, removeProjectFromCategory);

export default router;
