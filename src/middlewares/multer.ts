import multer from "multer";
import type { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "public/tmp");
  },
  filename: function (req: Request, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
