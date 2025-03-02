import express from "express";
import { checkUser, userLogin, userLogout, userSignup } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";
const router = express.Router();
router.post('/header', userSignup);

export { router as generalrouter };