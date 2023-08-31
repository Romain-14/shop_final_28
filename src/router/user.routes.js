import { Router } from "express";
import {
    signinView,
    signinUser,
    signupView,
    signupUser,
    signout,
} from "../controller/user.js";

const router = Router();

router.get("/signin", signinView);
router.post("/signin", signinUser);

router.get("/signup", signupView);
router.post("/signup", signupUser);

router.get("/signout", signout);

export default router;
