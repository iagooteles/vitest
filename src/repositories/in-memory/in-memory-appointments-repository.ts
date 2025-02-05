import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointments-repository";


export class InMemoryAppointmentsRepository implements AppointmentRepository {
    public items: Appointment[] = []

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }

    // save(appointment: Appointment): Promise<void> {
        
    // }
    
    
    async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.items.find(appointment => {
            return areIntervalsOverlapping(
                {start: startsAt, end: endsAt },
                {start: appointment.startsAt, end: appointment.endsAt},
                {inclusive: true}
            )
        })

        return overlappingAppointment || null;
    }

}