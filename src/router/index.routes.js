import {Router} from "express";
import { homeView } from "../controller/home.js";
import product_router from "./product.routes.js";
import user_router from "./user.routes.js";

const router = Router();

router.get("/", homeView);
router.use("/product", product_router);
router.use("/user", user_router);
router.get("*", (req,res) => res.status(404).render("not_found"));

export default router;