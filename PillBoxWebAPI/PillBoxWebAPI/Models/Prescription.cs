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
        private Int64 rx;
        private string doctor = string.Empty;
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
        public Int64 Rx
        {
            get { return rx; }
            set { rx = value; }
        }

        [Required]
        public string Doctor
        {
            get { return doctor; }
            set { doctor = value; }
        }

        public DateTime DateObtained
        {
            get { return dateObtained; }
            set { dateObtained = value; }
        }

        public Prescription()
        {
               
        }

        public Prescription(long id, long personId, long rx, string doctor, DateTime dateObtained)
        {
            Id = id;
            PersonId = personId;
            Rx = rx;
            Doctor = doctor;
            DateObtained = dateObtained;
        }
    }
}
