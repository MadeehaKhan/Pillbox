export class Medication {
    id: number;
    din: number;
    personId: number;
    prescriptionId: number;
    name: string;
    dosage: string;
    strength: 1;
    units: string;
    format: string;
    instructions: string;
    numRefills: number;
    remainingPills: number;
    pharmacyObtained: string;
    image: any;
    takeAsNeeded: boolean;
    sideEffects: string;
    dateObtained: Date;
    isChecked: boolean;
}