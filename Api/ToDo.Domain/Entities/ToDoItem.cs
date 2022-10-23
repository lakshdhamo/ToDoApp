using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Domain.Entities
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public DateTime Deadline { get; set; }

        public bool IsActive { get; set; }

        public bool IsDone { get; set; }
    }
}
