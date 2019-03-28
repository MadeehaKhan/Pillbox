using System;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using PillBoxWebAPI.Models;
using PillBoxWebAPI.Utility;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        /// <summary>
        /// Get a peron
        /// GET: api/Person/GetPerson/email
        /// </summary>
        /// <param name="email">A string containing an email address.</param>
        /// <returns>A Person Object.</returns>
        [HttpGet]
        public ActionResult<Person> GetPerson(string email)
        {
            try
            {
                //TODO: Check if id is null
                var command = new SqlCommand("SELECT * FROM Person WHERE email = @email ", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@email", email);
                Connections.pillboxDatabase.Open();
                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    var person = new Person(
                        (Int64)reader["ID"],
                        (string)reader["givenname"],
                        (string)reader["lastname"],
                        (DateTime)reader["dateOfBirth"],
                        (string)reader["email"],
                        (Int64)reader["phonenumber"],
                        (string)reader["emergencycontact1"],
                        (string)reader["emergencycontact2"],
                        (string)reader["healthconditions"],
                        (string)reader["primaryphysician"],
                        (bool)reader["iscaregiver"]
                        );
                    return person;
                }
                throw new Exception($"Error. No data to read for Person Email: {email}");
            }
            catch (Exception ex)
            {
                return BadRequest($"GetPerson() \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Creates a new person
        /// POST: api/Person/SignUp/
        /// </summary>
        /// <param name="person">A person object.</param>
        /// <returns>A Person Object.</returns>
        [HttpPost]
        public ActionResult<Person> SignUp([FromBody] Person person)
        {
            try
            {
                //TODO: Check if email already exists

                //command = new SqlCommand("INSERT INTO Person (givenname, lastname, age, email, [password], salt, phonenumber, emergencycontact1, emergencycontact2, height, [weight], healthconditions, primaryphysician, iscaregiver) " +
                //             " VALUES ('Bruce', 'Wayne', 34, 'bruce@wayen.com', HASHBYTES('SHA2_512', 'apple123' + CAST(@salt AS NVARCHAR(36))), @salt, 9058074564, 'e1', 'e2', 5.9, 200.0, 'hc', 'Dr.Who', 1); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                var command = new SqlCommand("INSERT INTO Person (givenname, lastname, dateOfBirth, email, [password], salt, phonenumber, emergencycontact1, emergencycontact2, healthconditions, primaryphysician, iscaregiver) " +
                             " VALUES (@givenname, @lastname, @dateOfBirth, @email, HASHBYTES('SHA2_512', @password + CAST(@salt AS NVARCHAR(36))), @salt, @phonenumber, @emergencycontact1, @emergencycontact2, @healthconditions, @primaryphysician, @iscaregiver); SELECT SCOPE_IDENTITY();", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@givenname", person.GivenName);
                command.Parameters.AddWithValue("@lastname", person.LastName);
                command.Parameters.AddWithValue("@dateOfBirth", person.DateOfBirth);
                command.Parameters.AddWithValue("@email", person.Email);
                command.Parameters.AddWithValue("@password", person.PasswordString);
                command.Parameters.AddWithValue("@salt", Guid.NewGuid());
                command.Parameters.AddWithValue("@phonenumber", person.PhoneNumber);
                command.Parameters.AddWithValue("@emergencycontact1", person.EmergencyContact1);
                command.Parameters.AddWithValue("@emergencycontact2", person.EmergencyContact2);
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

        /// <summary>
        /// Edit a person
        /// POST: api/Person/EditPerson/
        /// </summary>
        /// <param name="person">A person object.</param>
        /// <returns>Id of the person that was modified.</returns>
        [HttpPost]
        public ActionResult<int> EditPerson([FromBody] Person person)
        {
            try
            {
                //TODO: Check if id is null
                var command = new SqlCommand("UPDATE Person SET " +
                    "givenname=@givenname, lastname=@lastname, dateOfBirth=@dateOfBirth, " +
                    "phonenumber=@phonenumber, emergencycontact1=@emergencycontact1, emergencycontact2=@emergencycontact2, " +
                    "healthconditions=@healthconditions, primaryphysician=@primaryphysician, iscaregiver=@iscaregiver " +
                    " WHERE ID=@id", Connections.pillboxDatabase);

                command.Parameters.AddWithValue("@id", person.Id);
                command.Parameters.AddWithValue("@givenname", person.GivenName);
                command.Parameters.AddWithValue("@lastname", person.LastName);
                command.Parameters.AddWithValue("@dateOfBirth", person.DateOfBirth);
                command.Parameters.AddWithValue("@phonenumber", person.PhoneNumber);
                command.Parameters.AddWithValue("@emergencycontact1", person.EmergencyContact1);
                command.Parameters.AddWithValue("@emergencycontact2", person.EmergencyContact2);
                command.Parameters.AddWithValue("@healthconditions", person.HealthConditions);
                command.Parameters.AddWithValue("@primaryphysician", person.PrimaryPhysician);
                command.Parameters.AddWithValue("@iscaregiver", person.IsCaregiver);

                Connections.pillboxDatabase.Open();
                command.ExecuteScalar();

                return Ok($"Successfully updated Person: {person.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"EditPerson() \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// TODO: Not implemented yet
        /// TODO: Add list in CaregiverOf and CaregiverRecient of
        /// POST: api/Person/SharePersonInfo/
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<int> SharePersonInfo(int i)
        {
            return 1;
        }

        /// <summary>
        /// Delete a person
        /// POST: api/Person/DeletePerson/id
        /// </summary>
        /// <param name="id">A long precision number.</param>
        /// <returns>A success of fail message.</returns>
        [HttpPost("{id}")]
        public ActionResult<int> DeletePerson(long id)
        {
            try
            {
                var command = new SqlCommand("DELETE FROM Person WHERE ID=@ID", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@ID", id);
                Connections.pillboxDatabase.Open();
                command.ExecuteNonQuery();
                return Ok($"Person: {id} deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"DeletePerson({id}) Failed \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        /// <summary>
        /// Authenticate User given an email and password
        /// POST: api/Person/AuthenticateUser/
        /// </summary>
        /// <param name="userAuth">A UserAuthentication object containg an email and password.</param>
        /// <returns>A boolean. True if credentials are valid. False if invalid.</returns>
        [HttpPost]
        public ActionResult<bool> AuthenticateUser([FromBody] UserAuthentication userAuth)
        {
            try
            {
                //TODO: Check if email and password empty???
                var command = new SqlCommand("SELECT COUNT(*) FROM Person WHERE email=@email AND [password] = HASHBYTES('SHA2_512', @password + CAST(salt AS NVARCHAR(36)))", Connections.pillboxDatabase);
                command.Parameters.AddWithValue("@email", userAuth.Email);
                command.Parameters.AddWithValue("@password", userAuth.PasswordString);

                Connections.pillboxDatabase.Open();

                var count = Convert.ToInt32(command.ExecuteScalar());

                if (count == 1)
                {
                    return true;
                }
                else if (count == 0)
                {
                    return false;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                return BadRequest($"AuthenticateUser({userAuth.Email}) \n {ex.ToString()}");
            }
            finally
            {
                Connections.pillboxDatabase.Close();
            }
        }

        //Used for user authentication
        public class UserAuthentication
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string PasswordString { get; set; }            
        }
    }
}