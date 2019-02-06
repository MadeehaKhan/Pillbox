using System.Data.SqlClient;

namespace PillBoxWebAPI.Utility
{
    public static class Connections
    {
        //private static string connectionString;
        public static SqlConnection pillboxDatabase = new SqlConnection(Startup.connection);
    }
}
