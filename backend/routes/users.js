import express from "express"
import { GetUsersProfile, LoginUser,HashPassword, NewUser, ReSendCode, RecommendedUserProfile, VerfiedUser,VerifyUser, deleteAllNodes } from "../controllers/users.js";

const router=express.Router();
router.post('/',NewUser);
router.post('/send',ReSendCode);
router.post('/verify',VerfiedUser);
router.post('/login',LoginUser);
router.post('/verifyUser',VerifyUser)
router.post('/delete',deleteAllNodes)
router.post('/recommended',RecommendedUserProfile)
router.post('/getUsers',GetUsersProfile)
router.post('/hashpassword',HashPassword)

export default router;