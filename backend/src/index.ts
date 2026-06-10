import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

const app: express.Express = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Standard parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
import { uploadRouter } from "./routes/upload.route";
app.use("/api", uploadRouter);

// Error handling middleware (must be registered last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`[Server] running on http://localhost:${PORT}`);
});

export default app;
