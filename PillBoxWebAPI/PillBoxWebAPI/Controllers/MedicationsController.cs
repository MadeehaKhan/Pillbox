using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using PillBoxWebAPI.Models;
using PillBoxWebAPI.Utility;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicationsController : ControllerBase
    {
        // GET: api/Medications/GetMedications/id
        [HttpGet("{id}")]
        public ActionResult<Medication> GetMedication(int id)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM Medication WHERE ID = @ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                var medication = new Medication(
                    (int)reader["ID"],
                    (int)reader["DIN"],
                    (int)reader["PERSONID"],
                    (int)reader["PRESCRIPTIONID"],
                    (string)reader["NAME"],
                    (double)reader["STRENGTH"],
                    (double)reader["REMAININGPILLS"],
                    (string)reader["PHARMACYOBTAINED"],
                    null,                                   //Image
                    (bool)reader["TAKEASNEEDED"],
                    (DateTime)reader["DATEOBTAINED"],
                    (string)reader["SIDEEFFECTS"]
                    );

                Connections.pillboxDatabase.Close();
                return medication;
            }
            catch (Exception ex)
            {
                return BadRequest("GetMedications() method. \n::::\n" + ex.ToString());
            }
        }

        // POST: api/Medications/CreateMedication
        [HttpPost]
        public ActionResult<int> CreateMedication([FromForm] Medication medication)
        {
            try
            {
                var command = new SqlCommand("INSERT INTO Medication (DIN, PERSONID, PRESCRIPTIONID, [NAME]" +
                    ", STRENGTH, REMAININGPILLS, PHARMACYOBTAINED,[image], TAKEASNEEDED, SIDEEFFECTS, DATEOBTAINED)" +
                    "VALUES(@DIN, @PERSONID, @PRESCRIPTIONID, @NAME, @STRENGTH, @REMAININGPILLS, @PHARMACYOBTAINED," +
                    " null, @TAKEASNEEDED, @SIDEEFFECTS, @DATEOBTAINED); SELECT SCOPE_IDENTITY()", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@DIN", medication.DIN);
                command.Parameters.AddWithValue("@PERSONID", medication.PersonId);
                command.Parameters.AddWithValue("@PRESCRIPTIONID", medication.PrescriptionId);
                command.Parameters.AddWithValue("@NAME", medication.Name);
                command.Parameters.AddWithValue("@STRENGTH", medication.Strength);
                command.Parameters.AddWithValue("@REMAININGPILLS", medication.RemainingPills);
                command.Parameters.AddWithValue("@PHARMACYOBTAINED", medication.PharmacyObtained);
                command.Parameters.AddWithValue("@TAKEASNEEDED", medication.TakeAsNeeded);
                command.Parameters.AddWithValue("@SIDEEFFECTS", medication.SideEffects);
                command.Parameters.AddWithValue("@DATEOBTAINED", medication.DateObtained);

                Connections.pillboxDatabase.Open();

                var medicationId = Convert.ToInt32(command.ExecuteScalar());

                Connections.pillboxDatabase.Close();

                return Ok(medicationId);
            }
            catch (Exception ex)
            {
                return BadRequest($"CreateMedication() error \n {ex.ToString()}");
            }
        }

        // POST: api/Medications/EditMedication
        [HttpPost]
        public ActionResult<string> EditMedication([FromForm] Medication medication)
        {
            try
            {
                var command = new SqlCommand("UPDATE Medication SET DIN=@DIN, PERSONID=@PERSONID, PRESCRIPTIONID=@PRESCRIPTIONID " +
                    ", [NAME]=@NAME, STRENGTH=@STRENGTH, REMAININGPILLS=@REMAININGPILLS, PHARMACYOBTAINED=@PHARMACYOBTAINED" +
                    ", [IMAGE]=null, TAKEASNEEDED=@TAKEASNEEDED, SIDEEFFECTS=@SIDEEFFECTS, DATEOBTAINED=@DATEOBTAINED" +
                    "  WHERE ID=@ID", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@ID", medication.Id);
                command.Parameters.AddWithValue("@DIN", medication.DIN);
                command.Parameters.AddWithValue("@PERSONID", medication.PersonId);
                command.Parameters.AddWithValue("@PRESCRIPTIONID", medication.PrescriptionId);
                command.Parameters.AddWithValue("@NAME", medication.Name);
                command.Parameters.AddWithValue("@STRENGTH", medication.Strength);
                command.Parameters.AddWithValue("@REMAININGPILLS", medication.RemainingPills);
                command.Parameters.AddWithValue("@PHARMACYOBTAINED", medication.PharmacyObtained);
                command.Parameters.AddWithValue("@TAKEASNEEDED", medication.TakeAsNeeded);
                command.Parameters.AddWithValue("@SIDEEFFECTS", medication.SideEffects);
                command.Parameters.AddWithValue("@DATEOBTAINED", medication.DateObtained);

                Connections.pillboxDatabase.Open();

                command.ExecuteScalar();

                Connections.pillboxDatabase.Close();

                return Ok($"Successfully updated Medication: {medication.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"CreateMedication() error \n {ex.ToString()}");
            }
        }

        // GET: api/Medications/DeleteMedication/id
        [HttpGet("{id}")]
        public ActionResult<string> DeleteMedication(int id)
        {
            try
            {
                var command = new SqlCommand("DELETE FROM Medication WHERE ID = @ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();

                var affectedRows = command.ExecuteNonQuery();

                Connections.pillboxDatabase.Close();

                if (affectedRows > 1) throw new Exception("Several rows affected by deletion");
                if (affectedRows == 0) return Ok($"DeleteMedication() Medication: {id} found");
                return Ok($"Medication: {id} deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"DeleteMedication({id}) Failed \n {ex.ToString()}");
            }
        }

        // GET: api/Medications/GetMedicationByPerson/personId
        [HttpGet("{personid}")]
        public ActionResult<List<Medication>> GetMedicationByPerson(int personId)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM Medication WHERE PERSONID=@PERSONID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@PERSONID", personId);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                var medications = new List<Medication>();

                while (reader.Read())
                {
                    var medication = new Medication(
                        (int)reader["ID"],
                        (int)reader["DIN"],
                        (int)reader["PERSONID"],
                        (int)reader["PRESCRIPTIONID"],
                        (string)reader["NAME"],
                        (double)reader["STRENGTH"],
                        (double)reader["REMAININGPILLS"],
                        (string)reader["PHARMACYOBTAINED"],
                        null,                                   //Image
                        (bool)reader["TAKEASNEEDED"],
                        (DateTime)reader["DATEOBTAINED"],
                        (string)reader["SIDEEFFECTS"]
                        );
                    medications.Add(medication);
                }

                Connections.pillboxDatabase.Close();
                return medications;
            }
            catch (Exception ex)
            {
                return BadRequest($"GetMedicationByPerson({personId}) Failed \n {ex.ToString()}");
            }
        }

    }
}
