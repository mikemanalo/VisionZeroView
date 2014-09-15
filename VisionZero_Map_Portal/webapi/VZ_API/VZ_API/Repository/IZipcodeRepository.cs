using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VZ_API.Models;

namespace VZ_API.Repository
{
    public interface IZipcodeRepository
    {
        IEnumerable<zipcode> GetAll();
        zipcode Get(int zipcode);
    }
}