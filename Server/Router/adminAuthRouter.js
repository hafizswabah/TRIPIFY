import express from 'express';
import { adminadd, adminLogin,  adminLogout,  checkAdminLoggedIn} from '../Controller/adminAuthController.js';

const router=express.Router();

router.post("/login", adminLogin)
router.get("/check", checkAdminLoggedIn)
router.get("/logout", adminLogout)
router.post("/add",adminadd)

export default router