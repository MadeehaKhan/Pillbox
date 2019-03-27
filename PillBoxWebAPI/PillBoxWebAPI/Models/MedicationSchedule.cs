using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PillBoxWebAPI.Models
{
    public class MedicationSchedule
    {
        private long id;
        private long medicationId;
        private string name;
        private string medInfo;
        private string every;
        private int count;
        private DateTime date;
        private int hour;
        private int minute;
        private bool taken;


        public long Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public long MedicationId
        {
            get { return medicationId; }
            set { medicationId = value; }
        }

        [Required]
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        [Required]
        public string MedInfo
        {
            get { return medInfo; }
            set { medInfo = value; }
        }

        [Required]
        public string Every
        {
            get { return every; }
            set { every = value; }
        }

        [Required]
        public int Count
        {
            get { return count; }
            set { count = value; }
        }

        [Required]
        public DateTime Date
        {
            get { return date; }
            set { date = value; }
        }

        [Required]
        public int Hour
        {
            get { return hour; }
            set { hour = value; }
        }

        [Required]
        public int Minute
        {
            get { return minute; }
            set { minute = value; }
        }

        [Required]
        public bool Taken
        {
            get { return taken; }
            set { taken = value; }
        }

        public MedicationSchedule()
        {

        }

        public MedicationSchedule(long id, long medicationId, string name, string medInfo, string every, int count,  DateTime date, int hour, int minute, bool taken)
        {
            Id = id;
            MedicationId = medicationId;
            Name = name;
            MedInfo = medInfo;
            Every = every;
            Count = count;
            Date = date;
            Hour = hour;
            Minute = minute;
            Taken = taken;
        }
    }
}
