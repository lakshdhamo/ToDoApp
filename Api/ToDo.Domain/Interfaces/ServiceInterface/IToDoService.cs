using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Domain.Dto;
using ToDo.Domain.Entities;

namespace ToDo.Domain.Interfaces
{
    public interface IToDoService
    {
        Task<List<ToDoItem>> GetToDoList(int status);

        Task<ToDoItemDto> CreateToDoItemAsync(ToDoItemDto toDoItem);

        Task MarkAsDone(int id);

        ToDoItem UpdateToDoItem(in int id, ToDoItem toDoItem);

        Task DeleteToDoItem(int id);

        bool IsToDoItemAlreadyExists(ToDoItemDto toDoItem);
    }
}
