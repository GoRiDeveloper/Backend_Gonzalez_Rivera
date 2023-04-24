import { Router } from "express";
import { uploadFile } from "../middlewares/multer.js";
import { controllerImages } from "../controllers/images_controller.js";

export const IMAGES_ROUTER = Router();

IMAGES_ROUTER.post("/", uploadFile, controllerImages);