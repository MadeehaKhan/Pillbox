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
    public class MedicationsController : ControllerBase
    {
        // GET: api/Medications/GetMedications
        [HttpGet("{id}")]
        public ActionResult<List<Medication>> GetMedications(int id)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM Medication", Connections.pillboxDatabase);
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
                        (int)reader["SCHEDULEID"],
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
                return BadRequest("Something went wrong in the GetMedications() method. \n::::\n" + ex.ToString());
            }
        }

        // GET: api/Medications/CreateMedication
        [HttpPost]
        public ActionResult<Medication> CreateMedication([FromForm] Medication medication) 
        {            
            return medication;
        }
    }
}
