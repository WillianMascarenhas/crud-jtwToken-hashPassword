import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import verifyBodyIsValid from "../middleware/verifyBodyIsValid.middleware";
import { requestLoginSchema } from "../schemas/login.schemas";
import verifyActiveLogin from "../middleware/verifyActiveLogin.middleware";

const loginRouter: Router = Router()

loginRouter.post("",verifyBodyIsValid(requestLoginSchema),verifyActiveLogin, createLoginController)

export default loginRouter 