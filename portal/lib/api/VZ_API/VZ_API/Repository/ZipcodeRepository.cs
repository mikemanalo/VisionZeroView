using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using VZ_API.Models;

namespace VZ_API.Repository
{
    public class ZipcodeRepository : IZipcodeRepository
    {
        string conn = WebConfigurationManager.ConnectionStrings["DevGIS"].ToString();

        public IEnumerable<Models.zipcode> GetAll()
        {
            List<zipcode> zipcodes = new List<zipcode>();
            string query = string.Format("SELECT [ZIP], [X], [Y] FROM [tbl_ZipCode]");

            using (SqlConnection con =
                    new SqlConnection(conn))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        zipcode zip = new zipcode();
                        zip.zip = reader.GetInt32(0);
                        zip.X = reader.GetDouble(1);
                        zip.Y = reader.GetDouble(2);
                        zipcodes.Add(zip);
                    }
                }
            }
            return zipcodes.ToArray();
        }

        public Models.zipcode Get(int zipcode)
        {
            List<zipcode> zipcodes = new List<zipcode>();
            string query = string.Format("SELECT [ZIP], [X], [Y] FROM [tbl_ZipCode] where [ZIP] = "+zipcode );

            zipcode zip = new zipcode();

            using (SqlConnection con =
                    new SqlConnection(conn))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {                        
                        zip.zip = reader.GetInt32(0);
                        zip.X = reader.GetDouble(1);
                        zip.Y = reader.GetDouble(2);
                        zipcodes.Add(zip);
                    }
                }
            }
            return zip;
        }
    }
}