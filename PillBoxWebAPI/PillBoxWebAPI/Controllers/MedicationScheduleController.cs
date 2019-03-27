﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using PillBoxWebAPI.Models;
using PillBoxWebAPI.Utility;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicationScheduleController : ControllerBase
    {
        // GET: api/MedicationSchedule/GetMedicationSchedule/
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

        // POST: api/MedicationSchedule/GetMedicationSchedule/
        [HttpPost]
        public ActionResult<int> CreateMedicationSchedule([FromBody] MedicationSchedule medicationSchedule)
        {
            //TODO: If the timeframe is week, then repeat on should not be empty
            try
            {
                var command = new SqlCommand("INSERT INTO MedicationSchedule (MEDICATIONID, NAME, MEDINFO, EVERY, COUNT, DATE, HOUR, MINUTE) " +
                    "VALUES(@MEDICATIONID, @NAME, @MEDINFO, @EVERY, @COUNT, @DATE, @HOUR, @MINUTE); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@MEDICATIONID", medicationSchedule.MedicationId);
                command.Parameters.AddWithValue("@NAME", medicationSchedule.Name);
                command.Parameters.AddWithValue("@MEDINFO", medicationSchedule.MedInfo);
                command.Parameters.AddWithValue("@EVERY", medicationSchedule.Every);
                command.Parameters.AddWithValue("@COUNT", medicationSchedule.Count);
                command.Parameters.AddWithValue("@DATE", medicationSchedule.Date);
                command.Parameters.AddWithValue("@HOUR", medicationSchedule.Hour);
                command.Parameters.AddWithValue("@MINUTE", medicationSchedule.Minute);

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

        // POST: api/MedicationSchedule/EditMedicationSchedule/
        [HttpPost]
        public ActionResult<string> EditMedicationSchedule([FromBody] MedicationSchedule medicationSchedule)
        {
            try
            {
                var command = new SqlCommand("UPDATE MedicationSchedule SET MEDICATIONID=@MEDICATIONID, NAME=@NAME, MEDINFO=@MEDINFO, EVERY=@EVERY " +
                    ", COUNT=@COUNT, DATE=@DATE, HOUR=@HOUR, MINUTE=@MINUTE " +
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

        // POST: api/MedicationSchedule/DeleteMedicationSchedule/id
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

        // GET: api/MedicationSchedule/GetMedicationScheduleByMedication/medicationId
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

        //TODO: Not implemented yet 
        // GET: api/MedicationSchedule/PushNotification/
        [HttpGet]
        public ActionResult<List<MedicationSchedule>> PushNotification()
        {
            return Ok(1);
        }

    }
}