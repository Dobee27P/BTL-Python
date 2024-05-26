using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;

namespace NBA
{
    public partial class api : Page
    {
        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetNBA();
            }
        }

        private void GetNBA()
        {
            List<Team> teams = new List<Team>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("GetAllTeams", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Team team = new Team
                            {
                                Id = reader["id"] != DBNull.Value ? Convert.ToInt32(reader["id"]) : 0,
                                Abbreviation = reader["abbreviation"]?.ToString(),
                                City = reader["city"]?.ToString(),
                                Conference = reader["conference"]?.ToString(),
                                Division = reader["division"]?.ToString(),
                                Full_Name = reader["full_name"]?.ToString(),
                                Name = reader["name"]?.ToString(),
                                Score = reader["score"] != DBNull.Value ? Convert.ToDouble(reader["score"]) : 0.0
                            };
                            teams.Add(team);
                        }
                    }
                }
            }

            string jsonResponse = JsonConvert.SerializeObject(teams);
            Response.Clear();
            Response.Write(jsonResponse);
            Response.End();
        }

        public class Team
        {
            public int Id { get; set; }
            public string Abbreviation { get; set; }
            public string City { get; set; }
            public string Conference { get; set; }
            public string Division { get; set; }
            public string Full_Name { get; set; }
            public string Name { get; set; }
            public double Score { get; set; }
        }
    }
}
