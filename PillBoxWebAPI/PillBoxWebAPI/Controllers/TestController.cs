using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PillBoxWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public ActionResult Index()
        {
            return Ok("Pillbox API");
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "list of things. Item 1", "item 2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "Pillbox is the awesomest app ever!";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost]
        public ActionResult<byte[]> PostImage(IFormFile image)
        {
            var ms = new MemoryStream();
            byte[] imageBytes;

            if (image.Length > 0)
            {
                image.CopyTo(ms);
                imageBytes = ms.ToArray();
                return imageBytes;
            }

            return BadRequest("No Image was returned");
        }

        public async Task<ActionResult<string>> MakeRequest()
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "{subscription key}");

            // Request parameters
            queryString["language"] = "en";
            queryString["detectOrientation"] = "true";
            var uri = "https://westus.api.cognitive.microsoft.com/vision/v2.0/ocr?" + queryString;

            HttpResponseMessage response;

            // Request body
            byte[] byteData = Encoding.UTF8.GetBytes("{body}");

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("< your content type, i.e. application/json >");
                response = await client.PostAsync(uri, content);
            }

            return response.ToString();
        }
    }
}