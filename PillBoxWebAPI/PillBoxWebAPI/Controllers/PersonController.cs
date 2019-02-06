using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        // GET api/values/5
        [HttpPost]
        public ActionResult<string> CreatePerson()
        {
            return "Pillbox is the awesomest app ever!";
        }
    }
}