using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        public ActionResult<MedicationSchedule> GetMedicationSchedule(int id)
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
                        (int)reader["ID"],
                        (int)reader["MEDICATIONID"],
                        (DateTime)reader["STARTDATE"],
                        (int)reader["REPEATNUMBER"],
                        (string)reader["TIMEFRAME"],
                        (string)reader["REPEATON"]
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
        public ActionResult<int> CreateMedicationSchedule([FromForm] MedicationSchedule medicationSchedule)
        {
            //TODO: If the timeframe is week, then repeat on should not be empty
            try
            {
                var command = new SqlCommand("INSERT INTO MedicationSchedule (MEDICATIONID, STARTDATE, REPEATNUMBER, TIMEFRAME, REPEATON)" +
                    "VALUES(@MEDICATIONID, @STARTDATE, @REPEATNUMBER, @TIMEFRAME, @REPEATON); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@MEDICATIONID", medicationSchedule.MedicationId);
                command.Parameters.AddWithValue("@STARTDATE", medicationSchedule.StartDate);
                command.Parameters.AddWithValue("@REPEATNUMBER", medicationSchedule.RepeatNumber);
                command.Parameters.AddWithValue("@TIMEFRAME", medicationSchedule.TimeFrame);
                command.Parameters.AddWithValue("@REPEATON", medicationSchedule.RepeatOn);

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
        public ActionResult<string> EditMedicationSchedule([FromForm] MedicationSchedule medicationSchedule)
        {
            try
            {
                var command = new SqlCommand("UPDATE MedicationSchedule SET MEDICATIONID=@MEDICATIONID, STARTDATE=@STARTDATE, REPEATNUMBER=@REPEATNUMBER " +
                    ", TIMEFRAME=@TIMEFRAME, REPEATON=@REPEATON" +
                    "  WHERE ID=@ID", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@ID", medicationSchedule.Id);
                command.Parameters.AddWithValue("@MEDICATIONID", medicationSchedule.MedicationId);
                command.Parameters.AddWithValue("@STARTDATE", medicationSchedule.StartDate);
                command.Parameters.AddWithValue("@REPEATNUMBER", medicationSchedule.RepeatNumber);
                command.Parameters.AddWithValue("@TIMEFRAME", medicationSchedule.TimeFrame);
                command.Parameters.AddWithValue("@REPEATON", medicationSchedule.RepeatOn);

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
        public ActionResult<string> DeleteMedicationSchedule(int id)
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
                        (int)reader["ID"],
                        (int)reader["MEDICATIONID"],
                        (DateTime)reader["STARTDATE"],
                        (int)reader["REPEATNUMBER"],
                        (string)reader["TIMEFRAME"],
                        (string)reader["REPEATON"]
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

        //TODO: Not implemented yet
        // GET: api/MedicationSchedule/PushNotification/
        [HttpGet]
        public ActionResult<List<MedicationSchedule>> PushNotification()
        {
            return Ok(1);
        }

    }
}