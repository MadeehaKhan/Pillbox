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
        private double strength;
        private double remaining;
        private string pharmacyObtained;
        private IFormFile image;
        private bool takeAsNeeded;
        private string sideEffects;
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

        [Required]
        public double Strength
        {
            get { return strength; }
            set { strength = value; }
        }

        [Required]
        public double RemainingPills
        {
            get { return remaining; }
            set { remaining = value; }
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

        public Medication(Int64 id, Int64 din, Int64 personId, Int64 prescriptionId, string name
            , double strength, double remainingpills, string pharmacyObtained, IFormFile image, bool takeAsNeeded
            , DateTime dateObtained, string sideEffects)
        {
            Id = id;
            DIN = din;
            PersonId = personId;
            PrescriptionId = prescriptionId;
            Name = name;
            Strength = strength;
            RemainingPills = remainingpills;
            PharmacyObtained = pharmacyObtained;
            Image = image;
            TakeAsNeeded = takeAsNeeded;
            DateObtained = dateObtained;
            SideEffects = sideEffects;
        }
    }
}
