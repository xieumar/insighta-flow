import { Router } from "express";
import { executeQuery } from "../services/query-execution.service";

const router: Router = Router();

router.post("/query", async (req, res, next) => {
  try {
    const { query, limit, offset } = req.body;

    if (!query) {
      res.status(400).json({
        status: "error",
        message: "Missing 'query' object in request body.",
      });
      return;
    }

    const parsedLimit = limit !== undefined ? parseInt(String(limit), 10) : undefined;
    const parsedOffset = offset !== undefined ? parseInt(String(offset), 10) : undefined;

    if (parsedLimit !== undefined && (isNaN(parsedLimit) || parsedLimit < 0)) {
      res.status(400).json({ status: "error", message: "Invalid 'limit' parameter." });
      return;
    }

    if (parsedOffset !== undefined && (isNaN(parsedOffset) || parsedOffset < 0)) {
      res.status(400).json({ status: "error", message: "Invalid 'offset' parameter." });
      return;
    }

    const response = await executeQuery({
      query,
      limit: parsedLimit,
      offset: parsedOffset,
    });

    res.json(response);
  } catch (error: any) {
    // Pass validation/syntax error messages from parser to the client with a 400 status
    if (error.message && (error.message.startsWith("Unsupported") || error.message.startsWith("Invalid") || error.message.startsWith("Unknown"))) {
      res.status(400).json({ status: "error", message: error.message });
    } else {
      next(error);
    }
  }
});

export const queryRouter = router;
