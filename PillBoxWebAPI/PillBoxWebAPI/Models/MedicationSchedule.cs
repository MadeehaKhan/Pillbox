using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PillBoxWebAPI.Models
{
    public class MedicationSchedule
    {
        private int id;
        private int medicationId;
        private DateTime startDate;
        private int repeatNumber;
        private string timeFrame;
        private string repeatOn;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public int MedicationId
        {
            get { return medicationId; }
            set { medicationId = value; }
        }

        [Required]
        public DateTime StartDate
        {
            get { return startDate; }
            set { startDate = value; }
        }

        [Required]
        public int RepeatNumber
        {
            get { return repeatNumber; }
            set { repeatNumber = value; }
        }

        [Required]
        public string TimeFrame
        {
            get { return timeFrame; }
            set { timeFrame = value; }
        }

        public string RepeatOn
        {
            get { return repeatOn ?? string.Empty; }
            set { repeatOn = value; }
        }

        public MedicationSchedule()
        {

        }

        public MedicationSchedule(int id, int medicationId, DateTime startDate, int repeatNumber, string timeFrame, string repeatOn)
        {
            Id = id;
            MedicationId = medicationId;
            StartDate = startDate;
            RepeatNumber = repeatNumber;
            TimeFrame = timeFrame;
            RepeatOn = repeatOn;
        }
    }
}
