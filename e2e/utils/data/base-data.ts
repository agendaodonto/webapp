import { createClinics } from "./clinic.data";
import { createDentalPlans } from "./dental-plan.data";
import { createPatients } from "./patient.data";
import { createSchedules } from "./schedule.data";

export async function createBaseData(token: string, userId: number) {
    const [clinics, dentalPlans] = await Promise.all([createClinics(token, userId), createDentalPlans(token)]);
    clinics.forEach(async c => {
        const patients = await createPatients(token, c.id, dentalPlans[0].id!);
        const jobs = patients.map(p => createSchedules(token, userId, p.id));
        await Promise.all(jobs);
    })
}