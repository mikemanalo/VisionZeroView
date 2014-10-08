using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;
using VZ_API.Models;
using VZ_API.Repository;

namespace VZ_API.Controllers
{
    public class LocationController : ApiController
    {
        static readonly IZipcodeRepository repository = new ZipcodeRepository();
        string APIKey = "your API Key";

        // GET api/values
        [HttpGet]
        public IEnumerable<zipcode> Zip()
        {
            return repository.GetAll();
        }

        // GET api/values
        [HttpGet]
        public zipcode Zip(int zipcode)
        {
            zipcode zip = repository.Get(zipcode);
            if (zip == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return zip;
        }
    }
}
