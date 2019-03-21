using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

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
        // GET: api/Medications/GetMedication/id
        [HttpGet("{id}")]
        public ActionResult<Medication> GetMedication(long id)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM Medication WHERE ID=@ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    var medication = new Medication(
                        (long)reader["ID"],
                        (long)reader["DIN"],
                        (long)reader["PERSONID"],
                        (long)reader["PRESCRIPTIONID"],
                        (string)reader["NAME"],
                        (double)reader["STRENGTH"],
                        (double)reader["REMAININGPILLS"],
                        (string)reader["PHARMACYOBTAINED"],
                        null,                                   //Image
                        (bool)reader["TAKEASNEEDED"],
                        (DateTime)reader["DATEOBTAINED"],
                        (string)reader["SIDEEFFECTS"]
                        );
                    return medication;
                }

                throw new Exception($"Error. No data to read for Medication Id: {id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"GetMedication({id}) method. \n::::\n" + ex.ToString());
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // POST: api/Medications/CreateMedication
        [HttpPost]
        public ActionResult<int> CreateMedication([FromBody] Medication medication)
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

                return Ok(medicationId);
            }
            catch (Exception ex)
            {
                return BadRequest($"CreateMedication() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // POST: api/Medications/EditMedication
        [HttpPost]
        public ActionResult<string> EditMedication([FromBody] Medication medication)
        {
            try
            {
                //TODO: Check if id is null
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

                return Ok($"Successfully updated Medication: {medication.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"EditMedication() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // POST: api/Medications/DeleteMedication/id
        [HttpPost("{id}")]
        public ActionResult<string> DeleteMedication(long id)
        {
            try
            {
                var command = new SqlCommand("DELETE FROM Medication WHERE ID=@ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();

                var affectedRows = command.ExecuteNonQuery();
                if (affectedRows > 1) throw new Exception("Several rows affected by deletion");
                if (affectedRows == 0) return Ok($"DeleteMedication() Medication: {id} found");
                return Ok($"Medication: {id} deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"DeleteMedication({id}) Failed \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // GET: api/Medications/GetMedicationByPerson/personId
        [HttpGet("{personid}")]
        public ActionResult<List<Medication>> GetMedicationByPerson(long personId)
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
                        (long)reader["ID"],
                        (long)reader["DIN"],
                        (long)reader["PERSONID"],
                        (long)reader["PRESCRIPTIONID"],
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

                return medications;
            }
            catch (Exception ex)
            {
                return BadRequest($"GetMedicationByPerson({personId}) Failed \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // GET: api/Medications/GetMedicationByPrescriptionId/prescriptionId
        [HttpGet("{prescriptionId}")]
        public ActionResult<List<Medication>> GetMedicationByPrescriptionId(long prescriptionId)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM Medication WHERE prescriptionId=@prescriptionId", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@prescriptionId", prescriptionId);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                var medications = new List<Medication>();

                while (reader.Read())
                {
                    var medication = new Medication(
                        (long)reader["ID"],
                        (long)reader["DIN"],
                        (long)reader["PERSONID"],
                        (long)reader["PRESCRIPTIONID"],
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

                return medications;
            }
            catch (Exception ex)
            {
                return BadRequest($"GetMedicationByPrescriptionId({prescriptionId}) Failed \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // GET: api/Medications/GetPrescription/id
        [HttpGet("{id}")]
        public ActionResult<Prescription> GetPrescription(long id)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM Prescription WHERE ID=@ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();
                
                if (reader.HasRows)
                {
                    reader.Read();
                    var prescription = new Prescription(
                        (long)reader["ID"],
                        (long)reader["PERSONID"],
                        (long)reader["MINC"],
                        (string)reader["DOCTOR"],
                        (string)reader["INSTRUCTIONS"],
                        (int)reader["NUMREFILLS"],
                        (double)reader["DOSAGE"],
                        (string)reader["NAME"],
                        string.Empty,
                        (DateTime)reader["DATEOBTAINED"]
                        );
                    return prescription;
                }

                throw new Exception($"Error. No data to read for Prescription Id: {id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"GetPrescription({id}) method. \n::::\n" + ex.ToString());
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // POST: api/Medications/CreatePrescription/
        [HttpPost]
        public ActionResult<int> CreatePrescription([FromBody] Prescription prescription)
        {
            try
            {
                var command = new SqlCommand(@"INSERT INTO Prescription (PERSONID, MINC, DOCTOR, INSTRUCTIONS, NUMREFILLS, DOSAGE, [NAME], MEDICATIONLIST, DATEOBTAINED)
                              VALUES(@PERSONID, @MINC, @DOCTOR, @INSTRUCTIONS, @NUMREFILLS, @DOSAGE, @NAME, @MEDICATIONLIST, @DATEOBTAINED); SELECT SCOPE_IDENTITY(); "
                              , Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@PERSONID", prescription.PersonId);
                command.Parameters.AddWithValue("@MINC", prescription.MINC);
                command.Parameters.AddWithValue("@DOCTOR", prescription.Doctor);
                command.Parameters.AddWithValue("@INSTRUCTIONS", prescription.Instructions);
                command.Parameters.AddWithValue("@NUMREFILLS", prescription.NumRefills);
                command.Parameters.AddWithValue("@DOSAGE", prescription.Dosage);
                command.Parameters.AddWithValue("@NAME", prescription.Name);
                command.Parameters.AddWithValue("@MEDICATIONLIST", string.Empty);        //medication list
                command.Parameters.AddWithValue("@DATEOBTAINED", prescription.DateObtained);

                Connections.pillboxDatabase.Open();            
                var prescriptionId = Convert.ToInt32(command.ExecuteScalar());

                return Ok(prescriptionId);
            }
            catch (Exception ex)
            {
                return BadRequest($"CreatePrescription() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // POST: api/Medications/EditPrescription/
        [HttpPost]
        public ActionResult<string> EditPrescription([FromBody] Prescription prescription)
        {
            try
            {
                var command = new SqlCommand("UPDATE Prescription SET PERSONID=@PERSONID, MINC=@MINC, DOCTOR=@DOCTOR, INSTRUCTIONS=@INSTRUCTIONS " +
                    ", NUMREFILLS=@NUMREFILLS, DOSAGE=@DOSAGE, [NAME]=@NAME, MEDICATIONLIST=@MEDICATIONLIST, DATEOBTAINED=@DATEOBTAINED" +
                    "  WHERE ID=@ID", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@ID", prescription.Id);
                command.Parameters.AddWithValue("@PERSONID", prescription.PersonId);
                command.Parameters.AddWithValue("@MINC", prescription.MINC);
                command.Parameters.AddWithValue("@DOCTOR", prescription.Doctor);
                command.Parameters.AddWithValue("@INSTRUCTIONS", prescription.Instructions ?? string.Empty);
                command.Parameters.AddWithValue("@NUMREFILLS", prescription.NumRefills);
                command.Parameters.AddWithValue("@DOSAGE", prescription.Dosage);
                command.Parameters.AddWithValue("@NAME", prescription.Name ?? string.Empty);
                command.Parameters.AddWithValue("@MEDICATIONLIST", prescription.MedicationList);
                command.Parameters.AddWithValue("@DATEOBTAINED", prescription.DateObtained);

                Connections.pillboxDatabase.Open();
                command.ExecuteScalar();

                return Ok($"Successfully updated Prescription: {prescription.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"EditPrescription() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // POST: api/Medications/DeletePrescription/id
        [HttpPost("{id}")]
        public ActionResult<string> DeletePrescription(long id)
        {
            try
            {
                var command = new SqlCommand("DELETE FROM Prescription WHERE ID=@ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);

                Connections.pillboxDatabase.Open();
                var affectedRows = command.ExecuteNonQuery();

                if (affectedRows > 1) throw new Exception("Several rows affected by deletion");
                if (affectedRows == 0) return Ok($"DeletePrescription() Prescription: {id} found");
                return Ok($"Prescription: {id} deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"DeletePrescription({id}) Failed \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        // GET: api/Medications/GetPrescriptionByPerson/personId
        [HttpGet("{personid}")]
        public ActionResult<List<Prescription>> GetPrescriptionByPerson(long personId)
        {
            try
            {
                var command = new SqlCommand("SELECT * FROM Prescription WHERE PERSONID=@PERSONID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@PERSONID", personId);

                Connections.pillboxDatabase.Open();

                SqlDataReader reader = command.ExecuteReader();

                var prescriptions = new List<Prescription>();

                while (reader.Read())
                {
                    var prescription = new Prescription(
                        (long)reader["ID"],
                        (long)reader["PERSONID"],
                        (long)reader["MINC"],
                        (string)reader["DOCTOR"],
                        (string)reader["INSTRUCTIONS"],
                        (int)reader["NUMREFILLS"],
                        (double)reader["DOSAGE"],
                        (string)reader["NAME"],
                        string.Empty,
                        (DateTime)reader["DATEOBTAINED"]
                        );
                    prescriptions.Add(prescription);
                }

                return prescriptions;
            }
            catch (Exception ex)
            {
                return BadRequest($"GetPrescriptionByPerson({personId}) Failed \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        [HttpPost]
        public async Task<ActionResult<JsonResult>> Medicationocr(IFormFile file)
        {
            byte[] imageBytes;

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                imageBytes = ms.ToArray();
                //string s = Convert.ToBase64String(fileBytes);
                // act on the Base64 data
            }

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", Connections.OcrKey);

            // Request parameters
            queryString["language"] = "en";
            queryString["detectOrientation"] = "true";
            var uri = "https://centralus.api.cognitive.microsoft.com/vision/v2.0/ocr?" + queryString;

            //byte[] byteData = Encoding.UTF8.GetBytes("{body}");
            HttpResponseMessage response;

            var content = new MultipartFormDataContent();

            using (var imageContent = new ByteArrayContent(imageBytes))
            {
                imageContent.Headers.ContentType = new MediaTypeHeaderValue("multipart/form-data");
                imageContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data") { Name = file.Name, FileName = file.FileName };
                content.Add(imageContent);
                response = await client.PostAsync(uri, content);
            }
            var responseContent = await response.Content.ReadAsStringAsync();
            //return new JsonResult(ProcessImage(""));
            var json = JsonValue.Parse(responseContent);
            var result = new JsonResult(ProcessImage(json));
            result.ContentType = "application/json";
            result.StatusCode = 200;
            return result;
        }
        
        private Dictionary<string, object> ProcessImage(JsonValue imageJson)
        {
            var medication = new Medication();
            var prescription = new Prescription();
            medication.Name = "Test";
            prescription.Name = "P Test";

            if (!imageJson.ContainsKey("regions")) return new Dictionary<string, object>() { { "Medication", medication }, { "Prescription", prescription } };
            var regions = imageJson["regions"];

            for (int i = 0; i < regions.Count; i++)
            {
                var region = regions[i];
                if (region.ContainsKey("lines"))
                {
                    var lines = region["lines"];
                    for (int j = 0; j < lines.Count; j++)
                    {
                        var line = lines[j];                    
                        var words = line["words"];                                                
                        var strLine = GetLine(words);

                        //Regex's

                        //PRESCRIPTION
                        //Instructions
                        Match match = Regex.Match(strLine, @"TAKE");
                        if (match.Success)
                        {
                            prescription.Instructions = strLine;
                            continue;
                        }

                        //Date Obtained
                        match = Regex.Match(strLine, @"[0-9]{2}-[a-zA-Z]{3}-[0-9]{4}");
                        if (match.Success)
                        {
                            //TODO: Parse strLine to make a datetime object
                            prescription.DateObtained = new DateTime();
                            medication.DateObtained = new DateTime();
                            continue;
                        }

                        //Doctor
                        match = Regex.Match(strLine, @"Dr\.");
                        if (match.Success)
                        {
                            prescription.Doctor = strLine;
                            continue;
                        }

                        //DOSAGE
                        match = Regex.Match(strLine, @"TAKE\s*([0-9]+)[\w\s]*");
                        if (match.Success)
                        {
                            //1 'TABLET'? Is the tablet part needed?
                            prescription.Dosage = Convert.ToDouble(match.Groups[1].Value);
                            continue;
                        }

                        //MEDICATION
                        //DIN
                        match = Regex.Match(strLine, @"^DIN:\s*(\d+)[\s\w\/\:]*");
                        if (match.Success){
                            medication.DIN = Convert.ToInt64(match.Groups[1].Value);
                            continue;
                        }

                        //Name, and Strength
                        match = Regex.Match(strLine, @"^([\w\s]+)([\d*[\w]{2}])");
                        if (match.Success){
                            medication.Name = match.Groups[1].Value.Trim();
                            medication.Strength = Convert.ToDouble(match.Groups[2].Value);
                            continue;
                        }
                       
                        //Pharmacy Obtained

                        //Remaining Pills
                        match = Regex.Match(strLine, @"^([\d]+)[\s\w]*(\d[\w]{2})$");
                        if (match.Success){
                            medication.RemainingPills = Convert.ToDouble(match.Groups[1].Value);
                            continue;
                        }

                        //Take as needed
                        match = Regex.Match(strLine, @"^[\w\s]+AS\s*NEEDED$");
                        if (match.Success){
                            medication.TakeAsNeeded = true;
                            continue;
                        }
                       
                        var x = 0;


                        //for (int k = 0; k < words.Count; k++)
                        //{
                        //    if (words[k].ContainsKey("text"))
                        //    {
                        //        var word = words[k];
                        //        var text = words[k]["text"].ToString();
                        //        text = text.Replace("\"", " ").Replace("\\", " ").Trim();
                        //    }
                        //}                           
                    }
                }
            }

            var count = 0;

            var dict = new Dictionary<string, object>();
            dict.Add("Medication", medication);
            dict.Add("Prescription", prescription);

            return dict;
        }

        private bool LineContains(JsonValue words, string contains)
        {
            var result = false;

            for (int k = 0; k < words.Count; k++)
            {
                //if (words[k].ContainsKey("text"))
                //{
                    var word = words[k];
                    var text = words[k]["text"].ToString();
                    text = text.Replace("\"", " ").Replace("\\", " ").Trim();
                    if (string.Equals(text, contains, StringComparison.InvariantCultureIgnoreCase))
                    {
                        result = true;
                        break;
                    }
                //}
            }

            return result;
        }

        private string GetLine(JsonValue words)
        {
            var result = string.Empty;

            for (int k = 0; k < words.Count; k++)
            {
                //if (words[k].ContainsKey("text"))
                //{
                    var text = words[k]["text"].ToString();
                    text = text.Replace("\"", " ").Replace("\\", " ").Trim();
                    result += $" {text}";
                //}
            }

            return result.Trim();
        }
    }
}
