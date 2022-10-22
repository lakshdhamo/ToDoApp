using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Data;
using ToDo.Data.Entities;
using Microsoft.Extensions.Options;

namespace ToDo.Data.Context
{
    public class ToDoItemContext
    {
        private ConnectionStringOptions connectionStringOptions;
        public ToDoItemContext(IOptionsMonitor<ConnectionStringOptions> optionsMonitor)
        {
            connectionStringOptions = optionsMonitor.CurrentValue;
        }
        public IDbConnection CreateConnection() => new SqlConnection(connectionStringOptions.SqlConnection);

    }
}
