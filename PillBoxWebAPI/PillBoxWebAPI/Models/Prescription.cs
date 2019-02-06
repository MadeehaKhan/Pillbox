using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PillBoxWebAPI.Models
{
    public class Prescription
    {
        private int id;
        private int personId;
        private int minc;
        private string doctor;
        private string instructions;
        private int numRefills;
        private int dosage;
        private string name;
        private List<int> medicationList;
        private DateTime dateObtained;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public int PersonId
        {
            get { return personId; }
            set { personId = value; }
        }

        [Required]
        public int MINC
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

        [Required]
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
        public int Dosage
        {
            get { return dosage; }
            set { dosage = value; }
        }

        [Required]
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public List<int> MedicationList
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

        public Prescription(int id, int personId, int minc, string doctor, string instructions, int numRefills, int dosage, string name, List<int> medicationList
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
