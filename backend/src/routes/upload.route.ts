import { Router } from "express";
import Busboy from "busboy";
import { ingestCsvStream } from "../services/csv-ingestion.service";

const router: Router = Router();

router.post("/upload", (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  let fileProcessed = false;

  busboy.on("file", async (name, file, info) => {
    const { filename, mimeType } = info;

    if (!filename.toLowerCase().endsWith(".csv")) {
      res.status(400).json({
        status: "error",
        message: "Invalid file format. Only CSV files are allowed.",
      });
      // Drain the stream to let request complete cleanly
      file.resume();
      return;
    }

    fileProcessed = true;

    try {
      const result = await ingestCsvStream(file);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  busboy.on("finish", () => {
    if (!fileProcessed) {
      res.status(400).json({
        status: "error",
        message: "No file was uploaded.",
      });
    }
  });

  req.pipe(busboy);
});

export const uploadRouter = router;
