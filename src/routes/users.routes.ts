import { Router } from "express";
import { createUserController, dellUserController, getUserController, getUserProfileController, updateActiveController, updateUserController } from "../controllers/user.controller";
import verifyEmailExists from "../middleware/verifyEmailExists.middleware";
import verifyIdExists from "../middleware/verifyIdExists.middleware";
import verifyBodyIsValid from "../middleware/verifyBodyIsValid.middleware";
import { userSchemaRequest } from "../schemas/user.schemas";
import verifyTokenExists from "../middleware/verifyTokenExists.middleware";
import verifyIsAdmin from "../middleware/verifyIsAdimin.middleware";
import verifyIdsIsValid from "../middleware/verifyIdsIsValid.middleware";
import verifyActive from "../middleware/verifyActive.middleware";

const userRoutes: Router = Router()

userRoutes.post("", verifyBodyIsValid(userSchemaRequest), verifyEmailExists, createUserController)
userRoutes.get("", verifyTokenExists, verifyIsAdmin, getUserController)
userRoutes.get("/profile", verifyTokenExists, getUserProfileController)
userRoutes.patch("/:id", verifyIdExists, verifyTokenExists, verifyIsAdmin, verifyIdsIsValid, verifyEmailExists, updateUserController)
userRoutes.delete("/:id", verifyIdExists, verifyTokenExists, verifyIsAdmin, verifyIdsIsValid, dellUserController)
userRoutes.put("/:id/recover", verifyTokenExists, verifyIsAdmin, verifyActive, updateActiveController)



export default userRoutes