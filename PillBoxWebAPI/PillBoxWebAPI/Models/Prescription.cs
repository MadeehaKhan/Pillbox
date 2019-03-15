using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PillBoxWebAPI.Models
{
    public class Prescription
    {
        private Int64 id;
        private Int64 personId;
        private Int64 minc;
        private string doctor;
        private string instructions;
        private int numRefills;
        private double dosage;
        private string name;
        private string medicationList; // get rid of list
        private DateTime dateObtained;

        public Int64 Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public Int64 PersonId
        {
            get { return personId; }
            set { personId = value; }
        }

        [Required]
        public Int64 MINC
        {
            get { return minc; }
            set { minc = value; }
        }

        [Required]
        public string Doctor
        {
            get { return doctor; }
            set { doctor = value; }
        }

        public string Instructions
        {
            get { return instructions; }
            set { instructions = value; }
        }

        [Required]
        public int NumRefills
        {
            get { return numRefills; }
            set { numRefills = value; }
        }

        [Required]
        public double Dosage
        {
            get { return dosage; }
            set { dosage = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string MedicationList
        {
            get { return medicationList; }
            set { medicationList = value; }
        }

        public DateTime DateObtained
        {
            get { return dateObtained; }
            set { dateObtained = value; }
        }

        public Prescription()
        {
               
        }

        public Prescription(Int64 id, Int64 personId, Int64 minc, string doctor, string instructions, int numRefills, double dosage, string name, string medicationList
            , DateTime dateObtained)
        {
            Id = id;
            PersonId = personId;
            MINC = minc;
            Doctor = doctor;
            Instructions = instructions;
            NumRefills = numRefills;
            Dosage = dosage;
            Name = name;
            MedicationList = medicationList;
            DateObtained = dateObtained;
        }
    }
}
