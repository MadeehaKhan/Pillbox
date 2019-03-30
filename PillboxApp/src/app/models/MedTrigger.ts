export class MedTrigger{
    id: number; //to match the medication ID
    name: string;
    medicationId: number;
    medInfo: string;
    date: Date;
    every: string;
    count: number;
    refills: number;    //to be deleted?
    hour: number;
    minute: number;
    taken: boolean;
}