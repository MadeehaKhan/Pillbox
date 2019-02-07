using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PillBoxWebAPI.Models;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        //TODO: Not implemented yet
        // POST: api/Person/SignUp/
        // Create Person
        [HttpPost]
        public ActionResult<int> SignUp([FromForm] Person person)
        {
            return 1;
        }

        //TODO: Not implemented yet
        // POST: api/Person/EditPerson/
        [HttpPost]
        public ActionResult<int> EditPerson([FromForm] Person person)
        {
            return 1;
        }

        //TODO: Not implemented yet
        // POST: api/Person/SharePersonInfo/
        //TODO: Add list in CaregiverOf and CaregiverRecient of
        [HttpPost]
        public ActionResult<int> SharePersonInfo(int i)
        {
            return 1;
        }

        //TODO: Not implemented yet
        // GET: api/Person/AuthenticateUser/
        // Get User Info
        [HttpGet]
        public ActionResult<Person> AuthenticateUser()
        {
            return Ok(1);
        }
    }
}