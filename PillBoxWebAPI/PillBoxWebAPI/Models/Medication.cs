using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace PillBoxWebAPI.Models
{
    public class Medication
    {
        #region Public Properties

        public long Id { get; set; }

        [Required]
        public long DIN { get; set; }

        [Required]
        public long PersonId { get; set; }

        public long PrescriptionId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Dosage { get; set; } = string.Empty;

        [Required]
        public double Strength { get; set; }

        public string Units { get; set; } = string.Empty;

        public string Format { get; set; } = string.Empty;

        public string Instructions { get; set; } = string.Empty;

        [Required]
        public int NumRefills { get; set; }

        [Required]
        public double RemainingPills { get; set; }

        [Required]
        public string PharmacyObtained { get; set; } = string.Empty;

        public IFormFile Image { get; set; }

        [Required]
        public bool TakeAsNeeded { get; set; }

        [Required]
        public string SideEffects { get; set; } = string.Empty;

        [Required]
        public DateTime DateObtained { get; set; }

        #endregion

        //Used for returning images in byte form
        public byte[] ImageBytes { get; set; } = null;

        #region Constructors

        public Medication()
        {

        }

        public Medication(long id, long din, long personId, long prescriptionId, string name, string dosage
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

        #endregion
    }
}
