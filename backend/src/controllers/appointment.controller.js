import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
export const createAppointment = async(req,res)=>{
    try {
        const { patient, doctor, appointmentDate, reason } = req.body;
    
        if (!patient|| !doctor || !appointmentDate || !reason) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        // Check if the doctor is available at the requested time
        const Doctor = await User.findById(doctor);
        if (!Doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        
    
        // Create the appointment
        const newAppointment = new Appointment({
        patient: patient,
        doctor: doctor,
        appointmentDate,
        reason,
        });
    
        await newAppointment.save();
        
        res.status(201).json({ message: "Appointment created successfully", appointment: {
            _id: newAppointment._id,
            patient: newAppointment.patient,
            doctor: newAppointment.doctor,
            appointmentDate: newAppointment.appointmentDate,
            reason: newAppointment.reason,
        }});
    } catch (error) {
        console.log("Error in createAppointment controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({doctor: req.user._id})
            .populate("patient", "fullName email")
            .populate("doctor", "fullName email");
        res.status(200).json(appointments);
    } catch (error) {
        console.log("Error in getAllAppointments controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};