import { Router } from "express";
import { saveWorkspace, getWorkspaceById } from "../services/workspace.service";

const router: Router = Router();

// Save a workspace
router.post("/workspace", async (req, res, next) => {
  try {
    const { name, query_tree, dataset_id } = req.body;

    if (!query_tree) {
      res.status(400).json({
        status: "error",
        message: "Missing 'query_tree' in request body.",
      });
      return;
    }

    const workspace = await saveWorkspace({
      name,
      query_tree,
      dataset_id,
    });

    res.status(201).json(workspace);
  } catch (error) {
    next(error);
  }
});

// Load a workspace by ID
router.get("/workspace/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const workspace = await getWorkspaceById(id);

    if (!workspace) {
      res.status(404).json({
        status: "error",
        message: `Workspace with ID '${id}' not found.`,
      });
      return;
    }

    res.json(workspace);
  } catch (error) {
    next(error);
  }
});

export const workspaceRouter = router;
