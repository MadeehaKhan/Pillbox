using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PillBoxWebAPI.Models;
using PillBoxWebAPI.Utility;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicationScheduleController : ControllerBase
    {
        /// <summary>
        /// Get a medication schedule
        /// GET: api/MedicationSchedule/GetMedicationSchedule/ 
        /// </summary>
        /// <param name="id">A long precision number.</param>
        /// <returns>A medication schedule.</returns>
        [HttpGet("{id}")]
        public ActionResult<MedicationSchedule> GetMedicationSchedule(long id)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM MedicationSchedule WHERE ID=@ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    var medicationSchedule = new MedicationSchedule(
                        (long)reader["ID"],
                        (long)reader["MEDICATIONID"],
                        (string)reader["NAME"],
                        (string)reader["MEDINFO"],
                        (string)reader["EVERY"],
                        (int)reader["COUNT"],
                        (DateTime)reader["DATE"],
                        (int)reader["HOUR"],
                        (int)reader["MINUTE"],
                        (bool)reader["TAKEN"]
                        );
                    return medicationSchedule;
                }

                throw new Exception($"Error. No data to read for MedicationSchedule Id: {id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"GetMedicationSchedule({id}) method. \n::::\n" + ex.ToString());
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Create a medication schedule
        /// POST: api/MedicationSchedule/GetMedicationSchedule/
        /// </summary>
        /// <param name="medicationSchedule">A MedicationSchedule object.</param>
        /// <returns>Id of the medication schedule created.</returns>
        [HttpPost]
        public ActionResult<int> CreateMedicationSchedule([FromBody] MedicationSchedule medicationSchedule)
        {
            try
            {
                var command = new SqlCommand("INSERT INTO MedicationSchedule (MEDICATIONID, NAME, MEDINFO, EVERY, COUNT, DATE, HOUR, MINUTE, TAKEN) " +
                    "VALUES(@MEDICATIONID, @NAME, @MEDINFO, @EVERY, @COUNT, @DATE, @HOUR, @MINUTE, @TAKEN); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@MEDICATIONID", medicationSchedule.MedicationId);
                command.Parameters.AddWithValue("@NAME", medicationSchedule.Name);
                command.Parameters.AddWithValue("@MEDINFO", medicationSchedule.MedInfo);
                command.Parameters.AddWithValue("@EVERY", medicationSchedule.Every);
                command.Parameters.AddWithValue("@COUNT", medicationSchedule.Count);
                command.Parameters.AddWithValue("@DATE", medicationSchedule.Date);
                command.Parameters.AddWithValue("@HOUR", medicationSchedule.Hour);
                command.Parameters.AddWithValue("@MINUTE", medicationSchedule.Minute);
                command.Parameters.AddWithValue("@TAKEN", medicationSchedule.Taken);

                Connections.pillboxDatabase.Open();

                var medScheduleId = Convert.ToInt32(command.ExecuteScalar());

                return Ok(medScheduleId);
            }
            catch (Exception ex)
            {
                return BadRequest($"CreateMedicationSchedule() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Create a medication schedule
        /// POST: api/MedicationSchedule/GetMedicationSchedule/
        /// </summary>
        /// <param name="medicationSchedule">A MedicationSchedule object.</param>
        /// <returns>Id of the medication schedule created.</returns>
        private MedicationSchedule CreateSingleMedicationSechudle(MedicationSchedule medicationSchedule)
        {
            //TODO: If the timeframe is week, then repeat on should not be empty
            try
            {
                var command = new SqlCommand("INSERT INTO MedicationSchedule (MEDICATIONID, NAME, MEDINFO, EVERY, COUNT, DATE, HOUR, MINUTE, TAKEN) " +
                    "VALUES(@MEDICATIONID, @NAME, @MEDINFO, @EVERY, @COUNT, @DATE, @HOUR, @MINUTE, @TAKEN); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@MEDICATIONID", medicationSchedule.MedicationId);
                command.Parameters.AddWithValue("@NAME", medicationSchedule.Name);
                command.Parameters.AddWithValue("@MEDINFO", medicationSchedule.MedInfo);
                command.Parameters.AddWithValue("@EVERY", medicationSchedule.Every);
                command.Parameters.AddWithValue("@COUNT", medicationSchedule.Count);
                command.Parameters.AddWithValue("@DATE", medicationSchedule.Date);
                command.Parameters.AddWithValue("@HOUR", medicationSchedule.Hour);
                command.Parameters.AddWithValue("@MINUTE", medicationSchedule.Minute);
                command.Parameters.AddWithValue("@TAKEN", medicationSchedule.Taken);

                Connections.pillboxDatabase.Open();

                var medScheduleId = Convert.ToInt32(command.ExecuteScalar());
                medicationSchedule.Id = medScheduleId;
                return medicationSchedule; //ok
                //return Ok(medScheduleId);
            }
            catch (Exception ex)
            {
                return null; //bad request
                //return BadRequest($"CreateMedicationSchedule() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Create a medication schedule
        /// POST: api/MedicationSchedule/GetMedicationSchedule/
        /// </summary>
        /// <param name="medicationSchedule">A MedicationSchedule object.</param>
        /// <returns>Id of the medication schedule created.</returns>
        [HttpPost]
        public ActionResult<List<MedicationSchedule>> CreateNotificationSchedule([FromBody] List<MedicationSchedule> medicationSchedules, int repeatNotification)
        {
            //TODO: If the timeframe is week, then repeat on should not be empty
            List<MedicationSchedule> notificationSchedule = new List<MedicationSchedule>();
            
            try
            {
                if (medicationSchedules.Count <= 0) return BadRequest("No medication schedules given");

                medicationSchedules = medicationSchedules.OrderBy(x=> x.Date).ThenBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                var date = new DateTime();
                date = medicationSchedules.First().Date;
                var count = medicationSchedules.First().Count;
                var r = repeatNotification / Convert.ToDouble(medicationSchedules.Count);
                var daysWithNotification = Convert.ToInt32(Math.Ceiling(repeatNotification / Convert.ToDouble(medicationSchedules.Count)));
                var refillReminderSet = false;

                while (repeatNotification > 0)
                {                   
                    foreach (var medSchedule in medicationSchedules)
                    {
                        var temp = new MedicationSchedule
                        {
                            Id = medSchedule.Id,
                            MedicationId = medSchedule.MedicationId,
                            Name = medSchedule.Name,
                            MedInfo = medSchedule.MedInfo,
                            Every = medSchedule.Every,
                            Count = medSchedule.Count,
                            Date = date,
                            Hour = medSchedule.Hour,
                            Minute = medSchedule.Minute,
                            Taken = medSchedule.Taken
                        };

                        if (daysWithNotification <= 7 && !refillReminderSet)
                        {
                            //var refillCommand = new SqlCommand("INSERT INTO MedicationSchedule (MEDICATIONID, NAME, MEDINFO, EVERY, COUNT, DATE, HOUR, MINUTE, TAKEN) " +
                            //                "VALUES(@MEDICATIONID, @NAME, @MEDINFO, @EVERY, @COUNT, @DATE, @HOUR, @MINUTE, @TAKEN); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                            //refillCommand.Parameters.AddWithValue("@MEDICATIONID", medSchedule.MedicationId);
                            //refillCommand.Parameters.AddWithValue("@NAME", $"Pills for {medSchedule.Name} running low.");
                            //refillCommand.Parameters.AddWithValue("@MEDINFO", $"Only {daysWithNotification} remaining.");
                            //refillCommand.Parameters.AddWithValue("@EVERY", "day");
                            //refillCommand.Parameters.AddWithValue("@COUNT", 1);
                            //refillCommand.Parameters.AddWithValue("@DATE", temp.Date);
                            //refillCommand.Parameters.AddWithValue("@HOUR", medSchedule.Hour);
                            //refillCommand.Parameters.AddWithValue("@MINUTE", medSchedule.Minute);
                            //refillCommand.Parameters.AddWithValue("@TAKEN", medSchedule.Taken);

                            //Connections.pillboxDatabase.Open();
                            //var refillId = Convert.ToInt32(refillCommand.ExecuteScalar());
                            //temp.Id = refillId;
                            //notificationSchedule.Add(temp);
                            //Connections.pillboxDatabase.Close();

                            //refillReminderSet = true;
                        }

                        var command = new SqlCommand("INSERT INTO MedicationSchedule (MEDICATIONID, NAME, MEDINFO, EVERY, COUNT, DATE, HOUR, MINUTE, TAKEN) " +
                            "VALUES(@MEDICATIONID, @NAME, @MEDINFO, @EVERY, @COUNT, @DATE, @HOUR, @MINUTE, @TAKEN); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                        command.Parameters.AddWithValue("@MEDICATIONID", medSchedule.MedicationId);
                        command.Parameters.AddWithValue("@NAME", medSchedule.Name);
                        command.Parameters.AddWithValue("@MEDINFO", medSchedule.MedInfo);
                        command.Parameters.AddWithValue("@EVERY", medSchedule.Every);
                        command.Parameters.AddWithValue("@COUNT", medSchedule.Count);
                        command.Parameters.AddWithValue("@DATE", temp.Date);
                        command.Parameters.AddWithValue("@HOUR", medSchedule.Hour);
                        command.Parameters.AddWithValue("@MINUTE", medSchedule.Minute);
                        command.Parameters.AddWithValue("@TAKEN", medSchedule.Taken);

                        Connections.pillboxDatabase.Open();

                        var medScheduleId = Convert.ToInt32(command.ExecuteScalar());
                        temp.Id = medScheduleId;
                        notificationSchedule.Add(temp);

                        Connections.pillboxDatabase.Close();

                        repeatNotification--;
                        if (repeatNotification == 0) break;                        
                    }
                    daysWithNotification--;
                    date = date.AddDays(count); // mult by every?? e.g. * 7 for week       
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"CreateMedicationSchedule() error \n {ex.ToString()}");
            }
            finally
            {
                if (Connections.pillboxDatabase != null && Connections.pillboxDatabase.State == ConnectionState.Closed)
                {
                    Connections.pillboxDatabase.Close();
                }
            }

            //try
            //{
            //    foreach (var medSchedule in medicationSchedules)
            //    {
            //        var date = new DateTime();
            //        date = medSchedule.Date;
            //        for (int i = 0; i < repeatNotification; i++)
            //        {

            //            var temp = new MedicationSchedule();

            //            temp.Id = medSchedule.Id;
            //            temp.MedicationId = medSchedule.MedicationId;
            //            temp.Name = medSchedule.Name;
            //            temp.MedInfo = medSchedule.MedInfo;
            //            temp.Every = medSchedule.Every;
            //            temp.Count = medSchedule.Count;
            //            temp.Date = date;
            //            temp.Hour = medSchedule.Hour;
            //            temp.Minute = medSchedule.Minute;
            //            temp.Taken = medSchedule.Taken;

            //            var command = new SqlCommand("INSERT INTO MedicationSchedule (MEDICATIONID, NAME, MEDINFO, EVERY, COUNT, DATE, HOUR, MINUTE, TAKEN) " +
            //                "VALUES(@MEDICATIONID, @NAME, @MEDINFO, @EVERY, @COUNT, @DATE, @HOUR, @MINUTE, @TAKEN); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

            //            command.Parameters.AddWithValue("@MEDICATIONID", medSchedule.MedicationId);
            //            command.Parameters.AddWithValue("@NAME", medSchedule.Name);
            //            command.Parameters.AddWithValue("@MEDINFO", medSchedule.MedInfo);
            //            command.Parameters.AddWithValue("@EVERY", medSchedule.Every);
            //            command.Parameters.AddWithValue("@COUNT", medSchedule.Count);
            //            command.Parameters.AddWithValue("@DATE", temp.Date);
            //            command.Parameters.AddWithValue("@HOUR", medSchedule.Hour);
            //            command.Parameters.AddWithValue("@MINUTE", medSchedule.Minute);
            //            command.Parameters.AddWithValue("@TAKEN", medSchedule.Taken);

            //            Connections.pillboxDatabase.Open();

            //            var medScheduleId = Convert.ToInt32(command.ExecuteScalar());
            //            temp.Id = medScheduleId;
            //            notificationSchedule.Add(temp);
            //            date = date.AddDays(temp.Count); // mult by every?? e.g. * 7 for week       

            //            Connections.pillboxDatabase.Close();
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest($"CreateMedicationSchedule() error \n {ex.ToString()}");
            //}
            //finally
            //{
            //    if (Connections.pillboxDatabase != null && Connections.pillboxDatabase.State == ConnectionState.Closed)
            //    {
            //        Connections.pillboxDatabase.Close();
            //    }
            //}
            return notificationSchedule;
        }

        /// <summary>
        /// Edit medication schedule
        /// POST: api/MedicationSchedule/EditMedicationSchedule/
        /// </summary>
        /// <param name="medicationSchedule">A MedicationSchedule object.</param>
        /// <returns>A success or fail message.</returns>
        [HttpPost]
        public ActionResult<string> EditMedicationSchedule([FromBody] MedicationSchedule medicationSchedule)
        {
            try
            {
                var command = new SqlCommand("UPDATE MedicationSchedule SET MEDICATIONID=@MEDICATIONID, NAME=@NAME, MEDINFO=@MEDINFO, EVERY=@EVERY " +
                    ", COUNT=@COUNT, DATE=@DATE, HOUR=@HOUR, MINUTE=@MINUTE, TAKEN=@TAKEN " +
                    "  WHERE ID=@ID", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@ID", medicationSchedule.Id);
                command.Parameters.AddWithValue("@MEDICATIONID", medicationSchedule.MedicationId);
                command.Parameters.AddWithValue("@NAME", medicationSchedule.Name);
                command.Parameters.AddWithValue("@MEDINFO", medicationSchedule.MedInfo);
                command.Parameters.AddWithValue("@EVERY", medicationSchedule.Every);
                command.Parameters.AddWithValue("@COUNT", medicationSchedule.Count);
                command.Parameters.AddWithValue("@DATE", medicationSchedule.Date);
                command.Parameters.AddWithValue("@HOUR", medicationSchedule.Hour);
                command.Parameters.AddWithValue("@MINUTE", medicationSchedule.Minute);
                command.Parameters.AddWithValue("@TAKEN", medicationSchedule.Taken);

                Connections.pillboxDatabase.Open();

                command.ExecuteScalar();

                return Ok($"Successfully updated Medication: {medicationSchedule.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"CreateMedicationSchedule() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Delete a medication schedule
        /// POST: api/MedicationSchedule/DeleteMedicationSchedule/id
        /// </summary>
        /// <param name="id">A long precision number.</param>
        /// <returns>A success or fail message.</returns>
        [HttpPost("{id}")]
        public ActionResult<string> DeleteMedicationSchedule(long id)
        {
            try
            {
                var command = new SqlCommand("DELETE FROM MedicationSchedule WHERE ID=@ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();

                var affectedRows = command.ExecuteNonQuery();
                if (affectedRows > 1) throw new Exception("Several rows affected by deletion");
                if (affectedRows == 0) return Ok($"DeleteMedicationSchedule() Medication: {id} found");
                return Ok($"MedicationSchedule: {id} deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"DeleteMedicationSchedule({id}) Failed \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Get medication schedules that belong to a specific medication
        /// GET: api/MedicationSchedule/GetAllMedicatoinScheduleByDay/personId
        /// </summary>
        /// <param name="medicationId">A long precision number.</param>
        /// <returns>A list medication schedule.</returns>       
        [HttpGet("{medicationId}")]
        public ActionResult<List<MedicationSchedule>> GetMedicationScheduleByMedication(int medicationId)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM MedicationSchedule WHERE MEDICATIONID=@MEDICATIONID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@MEDICATIONID", medicationId);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                var medSchedules = new List<MedicationSchedule>();

                while (reader.Read())
                {
                    var medicationSchedule = new MedicationSchedule(
                        (long)reader["ID"],
                        (long)reader["MEDICATIONID"],
                        (string)reader["NAME"],
                        (string)reader["MEDINFO"],
                        (string)reader["EVERY"],
                        (int)reader["COUNT"],
                        (DateTime)reader["DATE"],
                        (int)reader["HOUR"],
                        (int)reader["MINUTE"],
                        (bool)reader["TAKEN"]
                        );
                    medSchedules.Add(medicationSchedule);
                }
                return medSchedules;
            }
            catch (Exception ex)
            {
                return BadRequest($"GetMedicationSchedule({medicationId}) method. \n::::\n" + ex.ToString());
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Get medication schedules that belong to a specific medication
        /// GET: api/MedicationSchedule/GetAllMedicatoinScheduleByDay/personId
        /// </summary>
        /// <param name="personId">A long precision number.</param>
        /// <param name="personId">A DateTime object.</param>
        /// <returns>A list medication schedule.</returns>       
        [HttpGet("{personId}")]
        public ActionResult<List<MedicationSchedule>> GetAllMedicatoinScheduleByDay(long personId, DateTime? day = null)
        {
            if (day == null) day = DateTime.Now;

            try
            {
                var command = new SqlCommand("SELECT * " +
                                        "FROM MedicationSchedule WHERE 1 = 1 " +
                                        "AND CAST([Date] AS Date) = CAST(@day AS Date) " +
                                        "AND medicationId IN " +
                                        "   (SELECT DISTINCT med.id FROM Medication AS med WHERE personId=@personId)", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@day", day);
                command.Parameters.AddWithValue("@personId", personId);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                var medSchedules = new List<MedicationSchedule>();

                while (reader.Read())
                {
                    var medicationSchedule = new MedicationSchedule(
                        (long)reader["ID"],
                        (long)reader["MEDICATIONID"],
                        (string)reader["NAME"],
                        (string)reader["MEDINFO"],
                        (string)reader["EVERY"],
                        (int)reader["COUNT"],
                        (DateTime)reader["DATE"],
                        (int)reader["HOUR"],
                        (int)reader["MINUTE"],
                        (bool)reader["TAKEN"]
                        );
                    medSchedules.Add(medicationSchedule);
                }
                return medSchedules;

            }
            catch (Exception ex)
            {
                return BadRequest($"GetAllMedicatoinScheduleByDay({personId},{day}) method. \n::::\n" + ex.ToString());
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// TODO: Not implemented yet 
        /// GET: api/MedicationSchedule/PushNotification/
        /// </summary>
        /// <param name="">A long precision number.</param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<List<MedicationSchedule>> PushNotification()
        {
            return Ok(1);
        }

    }
}