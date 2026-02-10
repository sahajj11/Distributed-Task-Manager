import { Router } from "express"
import * as TaskController from "../controllers/task.controler.ts"

const router = Router()

router.post('/create', TaskController.createTask);
router.get("/get-tasks/:projectId",TaskController.getTasksByProject)

export default router