using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace PillBoxWebAPI.Models
{
    public class Medication
    {
        private Int64 id;
        private Int64 din;
        private Int64 personId;
        private Int64 prescriptionId;
        private string name;
        private string dosage = string.Empty;
        private double strength;
        private string units = string.Empty;
        private string format = string.Empty;
        private string instructions = string.Empty;
        private int numRefills;
        private double remainingPills;
        private string pharmacyObtained = string.Empty;
        private IFormFile image;
        private bool takeAsNeeded;
        private string sideEffects = string.Empty;
        private DateTime dateObtained;

        public Int64 Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public Int64 DIN
        {
            get { return din; }
            set { din = value; }
        }

        [Required]
        public Int64 PersonId
        {
            get { return personId; }
            set { personId = value; }
        }

        public Int64 PrescriptionId
        {
            get { return prescriptionId; }
            set { prescriptionId = value; }
        }

        [Required]
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string Dosage
        {
            get { return dosage; }
            set { dosage = value; }
        }

        [Required]
        public double Strength
        {
            get { return strength; }
            set { strength = value; }
        }

        public string Units
        {
            get { return units; }
            set { units = value; }
        }

        public string Format
        {
            get { return format; }
            set { format = value; }
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
        public double RemainingPills
        {
            get { return remainingPills; }
            set { remainingPills = value; }
        }

        [Required]
        public string PharmacyObtained
        {
            get { return pharmacyObtained; }
            set { pharmacyObtained = value; }
        }

        public IFormFile Image
        {
            get { return image; }
            set { image = value; }
        }

        [Required]
        public bool TakeAsNeeded
        {
            get { return takeAsNeeded; }
            set { takeAsNeeded = value; }
        }

        [Required]
        public string SideEffects
        {
            get { return sideEffects; }
            set { sideEffects = value; }
        }

        [Required]
        public DateTime DateObtained
        {
            get { return dateObtained; }
            set { dateObtained = value; }
        }

        public Medication()
        {

        }

        public Medication(Int64 id, Int64 din, Int64 personId, Int64 prescriptionId, string name, string dosage
            , double strength, string units, string format, string instructions, int numRefills, double remainingpills
            , string pharmacyObtained, IFormFile image, bool takeAsNeeded, DateTime dateObtained, string sideEffects)
        {
            Id = id;
            DIN = din;
            PersonId = personId;
            PrescriptionId = prescriptionId;
            Name = name;
            Dosage = dosage;
            Strength = strength;
            Units = units;
            Format = format;
            Instructions = instructions;
            NumRefills = numRefills;
            RemainingPills = remainingpills;
            PharmacyObtained = pharmacyObtained;
            Image = image;
            TakeAsNeeded = takeAsNeeded;
            DateObtained = dateObtained;
            SideEffects = sideEffects;
        }
    }
}
