export class MedTrigger{
    id: number; //unique notification id
    medicationid: number; //to match the medication ID 
    name: string; //name of drug
    medInfo: string; //extra medication info
    every: string; //scale of frequency
    count: number; //how often it occurs
    refills: number; //how much medication is remaining
    date: Date;
    hour: number; 
    minute: number; 
}