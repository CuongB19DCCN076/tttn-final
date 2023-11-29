import express from "express";
import ProductController from "../controllers/ProductController.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.post('/create',authMiddleWare, ProductController.createProduct)
ProductRouter.put('/update/:id', authMiddleWare, ProductController.updateProduct)
ProductRouter.get('/get-details/:id', ProductController.getDetailsProduct)
ProductRouter.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)
ProductRouter.get('/get-all', ProductController.getAllProduct)
ProductRouter.post('/delete-many', authMiddleWare, ProductController.deleteMany)
ProductRouter.get('/get-all-type', ProductController.getAllType)

export default ProductRouter;