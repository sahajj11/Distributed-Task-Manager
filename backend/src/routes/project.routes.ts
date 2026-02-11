import { Router } from "express"
import * as ProjectController from "../controllers/project.controller.ts"

const router = Router()

router.post('/create', ProjectController.createProject);
router.get("/get-projects",ProjectController.getAllProjects)
router.get("/my-projects",ProjectController.getMyProjects)

export default router