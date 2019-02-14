using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PillBoxWebAPI.Models;
using PillBoxWebAPI.Utility;

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
        public ActionResult<Person> SignUp([FromForm] Person person)
        {            
            try
            {
                //command = new SqlCommand("INSERT INTO Person (givenname, lastname, age, email, [password], salt, phonenumber, emergencycontact1, emergencycontact2, height, [weight], healthconditions, primaryphysician, iscaregiver) " +
                //             " VALUES ('Bruce', 'Wayne', 34, 'bruce@wayen.com', HASHBYTES('SHA2_512', 'apple123' + CAST(@salt AS NVARCHAR(36))), @salt, 9058074564, 'e1', 'e2', 5.9, 200.0, 'hc', 'Dr.Who', 1); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

               var command = new SqlCommand("INSERT INTO Person (givenname, lastname, age, email, [password], salt, phonenumber, emergencycontact1, emergencycontact2, height, [weight], healthconditions, primaryphysician, iscaregiver) " +
                            " VALUES (@givenname, @lastname, @age, @email, HASHBYTES('SHA2_512', @password + CAST(@salt AS NVARCHAR(36))), @salt, @phonenumber, @emergencycontact1, @emergencycontact2, @height, @weight, @healthconditions, @primaryphysician, @iscaregiver); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@givenname", person.GivenName);
                command.Parameters.AddWithValue("@lastname", person.LastName);
                command.Parameters.AddWithValue("@age", person.Age);
                command.Parameters.AddWithValue("@email", person.Email);
                command.Parameters.AddWithValue("@password", person.PasswordString);
                command.Parameters.AddWithValue("@salt", Guid.NewGuid());
                command.Parameters.AddWithValue("@phonenumber", person.PhoneNumber);
                command.Parameters.AddWithValue("@emergencycontact1", person.EmergencyContact1);
                command.Parameters.AddWithValue("@emergencycontact2", person.EmergencyContact2);
                command.Parameters.AddWithValue("@height", person.Height);
                command.Parameters.AddWithValue("@weight", person.Weight);
                command.Parameters.AddWithValue("@healthconditions", person.HealthConditions);
                command.Parameters.AddWithValue("@primaryphysician", person.PrimaryPhysician);
                command.Parameters.AddWithValue("@iscaregiver", person.IsCaregiver);

                Connections.pillboxDatabase.Open();

                var medicationId = Convert.ToInt32(command.ExecuteScalar());
                return Ok(medicationId);
            }
            catch (Exception ex)
            {
                return BadRequest($"SignUp() error \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
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