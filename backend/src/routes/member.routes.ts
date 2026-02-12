import { Router } from "express"
import * as MemberController from "../controllers/member.controller.ts"

const router = Router()

router.post('/create', MemberController.addMemberToProject);

export default router
