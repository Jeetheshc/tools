import express from "express";
import { userLogin, userLogout, userSignup } from "../controllers/userControllers.js";
const router = express.Router();
router.post('/signup', userSignup);
router.get('/login', userLogin);
router.put('/logout', userLogout);
export { router as userRouter };