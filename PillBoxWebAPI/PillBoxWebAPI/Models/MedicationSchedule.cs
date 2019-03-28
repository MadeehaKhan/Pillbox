using System;
using System.ComponentModel.DataAnnotations;

namespace PillBoxWebAPI.Models
{
    public class MedicationSchedule
    {
        #region Public Properties

        public long Id { get; set; }

        [Required]
        public long MedicationId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string MedInfo { get; set; }

        [Required]
        public string Every { get; set; }

        [Required]
        public int Count { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int Hour { get; set; }

        [Required]
        public int Minute { get; set; }

        [Required]
        public bool Taken { get; set; }

        #endregion

        #region Constructors

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
        
        #endregion
    }
}
