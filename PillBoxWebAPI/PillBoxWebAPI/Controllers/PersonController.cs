﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [HttpPost]
        public ActionResult<Person> AuthenticateUser([FromForm] UserAuthentication userAuth)
        {

            return Ok($"email:{userAuth.Email} , password:{userAuth.Password}");
        }

        public class UserAuthentication
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }            
        }
    }
}