import {Router} from 'express';
import {protectedRoute} from '../middlewares/protectedRoute.js';
import {createAppointment,getAllAppointments} from '../controllers/appointment.controller.js';

const router = Router();

router.post("/createAppointment", protectedRoute, createAppointment);
router.get("/getAllAppointments", protectedRoute, getAllAppointments);

export default router;
