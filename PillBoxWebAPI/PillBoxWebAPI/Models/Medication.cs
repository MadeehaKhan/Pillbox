using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PillBoxWebAPI.Models
{
    public class Medication
    {
        private int id;
        private int din;
        private int personId;
        private int prescriptionId;
        private int scheduleId;
        private string name;
        private double strength;
        private double remaining;
        private string pharmacyObtained;
        private string image;
        private bool takeAsNeeded;
        private string sideEffects;
        private DateTime dateObtained;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public int DIN
        {
            get { return din; }
            set { din = value; }
        }

        [Required]
        public int PersonId
        {
            get { return personId; }
            set { personId = value; }
        }

        [Required]
        public int PrescriptionId
        {
            get { return prescriptionId; }
            set { prescriptionId = value; }
        }

        [Required]
        public int ScheduleId
        {
            get { return scheduleId; }
            set { scheduleId = value; }
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

        public string Image
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

        public Medication(int id, int din, int personId, int prescriptionId, int scheduleId, string name
            , double strength, double remainingpills, string pharmacyObtained, string image, bool takeAsNeeded
            , DateTime dateObtained, string sideEffects)
        {
            Id = id;
            DIN = din;
            PersonId = personId;
            PrescriptionId = prescriptionId;
            ScheduleId = scheduleId;
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
