using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PillBoxWebAPI.Models
{
    public class Person
    {
        #region Public Properties

        public long Id { get; set; }

        [Required]
        public string GivenName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        public byte[] Password { get; set; }

        public string PasswordString { get; set; } = string.Empty;

        public Guid Salt { get; set; }

        public long PhoneNumber { get; set; }

        public string EmergencyContact1 { get; set; } = string.Empty;

        public string EmergencyContact2 { get; set; } = string.Empty;

        public string HealthConditions { get; set; } = string.Empty;

        public string PrimaryPhysician { get; set; } = string.Empty;

        public List<Medication> MedicationList { get; set; }

        public List<string> PrescriptionList { get; set; }

        public bool IsCaregiver { get; set; }

        #endregion

        #region Constructors

        public Person()
        {

        }

        public Person(long id, string givenName, string lastName, DateTime dateOfBirth, string email, long phoneNumber
            , string emergencyContact1, string emergencyContact2, string healthConditions, string primaryPhysician, bool isCaregiver)
        {
            Id = id;
            GivenName = givenName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Email = email;
            Password = Password;
            Salt = Salt;
            PhoneNumber = phoneNumber;
            EmergencyContact1 = emergencyContact1;
            EmergencyContact2 = emergencyContact2;
            HealthConditions = healthConditions;
            PrimaryPhysician = primaryPhysician;
            MedicationList = MedicationList;
            PrescriptionList = PrescriptionList;
            IsCaregiver = isCaregiver;
        }

        #endregion
    }
}
