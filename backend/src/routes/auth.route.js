
import {Router} from 'express';
import {protectedRoute} from '../middlewares/protectedRoute.js';
import { signup ,login,logout,checkAuth} from '../controllers/auth.controller.js';
const router = Router();
router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkuser",protectedRoute, checkAuth);

export default router;