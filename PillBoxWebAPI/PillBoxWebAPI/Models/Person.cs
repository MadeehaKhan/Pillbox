﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PillBoxWebAPI.Models
{
    public class Person
    {
        private Int64 id;
        private string givenName;
        private string lastName;
        private int age;
        private string email;
        private byte[] password;
        private string passwordString;
        private Guid salt;
        private Int64 phoneNumber;
        private string emergencyContact1 = string.Empty;
        private string emergencyContact2 = string.Empty;
        private double height;
        private double weight;
        private string healthConditions = string.Empty;
        private string primaryPhysician = string.Empty;
        private List<Medication> medicationList;
        private List<string> prescriptionList;
        private bool isCaregiver;

        public Int64 Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public string GivenName
        {
            get { return givenName; }
            set { givenName = value; }
        }

        [Required]
        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }

        public int Age
        {
            get { return age; }
            set { age = value; }
        }

        [Required]
        public string Email
        {
            get { return email; }
            set { email = value; }
        }

        public byte[] Password
        {
            get { return password; }
            set { password = value; }
        }

        public string PasswordString
        {
            get { return passwordString; }
            set { passwordString = value; }
        }

        public Guid Salt
        {
            get { return salt; }
            set { salt = value; }
        }

        public Int64 PhoneNumber
        {
            get { return phoneNumber; }
            set { phoneNumber = value; }
        }

        public string EmergencyContact1
        {
            get { return emergencyContact1; }
            set { emergencyContact1 = value; }
        }

        public string EmergencyContact2
        {
            get { return emergencyContact2; }
            set { emergencyContact2 = value; }
        }
    
        public double Height
        {
            get { return height; }
            set { height = value; }
        }

        public double Weight
        {
            get { return weight; }
            set { weight = value; }
        }

        public string HealthConditions
        {
            get { return healthConditions; }
            set { healthConditions = value; }
        }

        public string PrimaryPhysician
        {
            get { return primaryPhysician; }
            set { primaryPhysician = value; }
        }

        public List<Medication> MedicationList
        {
            get { return medicationList; }
            set { medicationList = value; }
        }

        public List<string> PrescriptionList
        {
            get { return prescriptionList; }
            set { prescriptionList = value; }
        }

        public bool IsCaregiver
        {
            get { return isCaregiver; }
            set { isCaregiver = value; }
        }

        public Person()
        {

        }

        public Person(Int64 id, string givenName, string lastName, int age, string email, Int64 phoneNumber
            , string emergencyContact1, string emergencyContact2, double height, double weight, string healthConditions, string primaryPhysician
            , bool isCaregiver)
        {
            Id = id;
            GivenName = givenName;
            LastName = lastName;
            Age = age;
            Email = email;
            Password = password;
            Salt = salt;
            PhoneNumber = phoneNumber;
            EmergencyContact1 = emergencyContact1;
            EmergencyContact2 = emergencyContact2;
            Height = height;
            Weight = weight;
            HealthConditions = healthConditions;
            PrimaryPhysician = primaryPhysician;
            MedicationList = medicationList;
            PrescriptionList = prescriptionList;
            IsCaregiver = isCaregiver;
        }
    }
}
