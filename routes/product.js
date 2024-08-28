//backend/routes/product.js
import express from "express";
import { getProducts, addProducts, deleteProducts, patchProducts } from "../controller/product.js";

const router = express.Router();

router
    .get("/", getProducts)
    .post("/",addProducts)
    .delete("/:id",deleteProducts)
    .patch("/:id",patchProducts)

export default router;
