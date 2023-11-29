import express from "express";
import UserController from "../controllers/UserController.js";
import { authMiddleWare, authUserMiddleWare } from "../middleware/authMiddleware.js";
const UserRouter = express.Router();

UserRouter.post('/sign-up', UserController.createUser);
UserRouter.post('/sign-in', UserController.loginUser);
UserRouter.post('/log-out', UserController.logoutUser);
UserRouter.put('/update-user/:id',authUserMiddleWare, UserController.updateUser);
UserRouter.delete('/delete-user/:id',authMiddleWare, UserController.deleteUser);
UserRouter.get('/all-user',authMiddleWare , UserController.getAllUser);
UserRouter.get('/get-details/:id',authUserMiddleWare, UserController.getDetailsUser);
UserRouter.get('/refresh-token', UserController.refreshToken);
UserRouter.post('/delete-many',authMiddleWare, UserController.deleteMany);
    
export default UserRouter;