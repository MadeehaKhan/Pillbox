using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PillBoxWebAPI.Models;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicationScheduleController : ControllerBase
    {
        //TODO: Not implemented yet
        // GET: api/MedicationSchedule/GetMedicationSchedule/
        [HttpGet]
        public ActionResult<MedicationSchedule> GetMedicationSchedule(int id)
        {
            return Ok(1);
        }

        //TODO: Not implemented yet
        // POST: api/MedicationSchedule/GetMedicationSchedule/
        [HttpPost]
        public ActionResult<int> CreateMedicationSchedule([FromForm] MedicationSchedule medicationSchedule)
        {
            return 1;
        }

        //TODO: Not implemented yet
        // POST: api/MedicationSchedule/EditMedicationSchedule/
        [HttpPost]
        public ActionResult<string> EditMedicationSchedule([FromForm] MedicationSchedule medicationSchedule)
        {
            return Ok();
        }

        //TODO: Not implemented yet
        // POST: api/MedicationSchedule/DeleteMedicationSchedule/id
        [HttpPost("{id}")]
        public ActionResult<string> DeleteMedicationSchedule(int id)
        {
            return Ok("");
        }

        //TODO: Not implemented yet
        // GET: api/MedicationSchedule/GetMedicationScheduleByMedication/medicationId
        [HttpGet("{id}")]
        public ActionResult<List<MedicationSchedule>> GetMedicationScheduleByMedication(int medicationId)
        {
            return Ok(1);
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