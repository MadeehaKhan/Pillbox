using System;
using System.ComponentModel.DataAnnotations;

namespace PillBoxWebAPI.Models
{
    public class Prescription
    {
        #region Public Properties

        public long Id { get; set; }

        [Required]
        public long PersonId { get; set; }

        [Required]
        public long Rx { get; set; }

        [Required]
        public string Doctor { get; set; } = string.Empty;

        public DateTime DateObtained { get; set; }

        #endregion

        #region Constructors

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

        #endregion
    }
}
