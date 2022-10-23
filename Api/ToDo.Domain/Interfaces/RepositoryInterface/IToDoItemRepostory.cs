using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Domain.Dto;
using ToDo.Domain.Entities;

namespace ToDo.Domain.Interfaces.RepositoryInterface
{
    public interface IToDoItemRepostory
    {
        Task<IEnumerable<ToDoItem>> GetAllToDoItemsAsync(int status);

        Task<ToDoItemDto> InsertAsync(ToDoItemDto toDoItem);

        Task MarkAsDone(int id);

        Task DeleteTask(int id);

    }
}
