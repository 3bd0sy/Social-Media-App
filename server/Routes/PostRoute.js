import express from "express";
import { createPost, deletePost, getPost, getTimeLinePost, likePost, updatePost } from "../Controllers/PostController.js";

const router = express.Router()


router.post("/",createPost)
router.get("/:id",getPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.put("/:id/like",likePost)
router.get("/:id/timeline",getTimeLinePost)
export default router;