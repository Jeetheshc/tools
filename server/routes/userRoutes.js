import express from "express";
import { checkUser, getUserAddress, getUserProfile, updateUserProfile, userLogin, userLogout, userSignup } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";
import { addTaxSlab, editTaxSlab, getAllTaxSlabs, getTaxSlabs } from "../controllers/proftaxController.js";
const router = express.Router();
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.put('/logout', userLogout);
router.get('/check-user', userAuth, checkUser);
router.get('/address',userAuth,getUserAddress);
router.get('/profile',userAuth,getUserProfile);
router.put('/updateprofile',userAuth,updateUserProfile);
router.get('/proftax',userAuth,getTaxSlabs);
router.post('/tax-slabs',userAuth, addTaxSlab);
router.get('/getallslab',userAuth,getAllTaxSlabs);
router.put('/tax-slabs/:id',userAuth, editTaxSlab);


export { router as userRouter };