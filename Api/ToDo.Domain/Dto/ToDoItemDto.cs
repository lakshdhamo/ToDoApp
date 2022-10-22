using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Domain.Dto
{
    public record ToDoItemDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public DateTime Deadline { get; set; }

        public bool IsDone { get; set; }
    }
}
