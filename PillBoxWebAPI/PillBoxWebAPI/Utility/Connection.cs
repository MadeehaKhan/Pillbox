using PillBoxWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace PillBoxWebAPI.Utility
{
    public static class Connections
    {
        //private static string connectionString;
        public static SqlConnection pillboxDatabase = new SqlConnection(Startup.connection);

        //public static void SetConnectionString(string connection)
        //{
        //    connectionString = connection;
        //}
        //public static SqlConnection pillboxDatabase = new SqlConnection("Server=tcp:pillboxsqlserver.database.windows.net,1433;Initial Catalog=pillboxDatabase;Persist Security Info=False;User ID=adminUser;Password=pillboxPassword!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
    }
}
