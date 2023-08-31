import {Router} from "express";
import { productView, oneProductView, searchProductView, searchProduct } from "../controller/product.js";

const router = Router();

router.get("/", productView);
router.get("/search", searchProductView);
router.post("/search", searchProduct);
router.get("/:id", oneProductView);




export default router;