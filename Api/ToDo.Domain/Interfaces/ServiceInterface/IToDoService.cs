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
        /// <summary>
        /// Loads all the Todo items
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        Task<List<ToDoItem>> GetToDoList(int status);

        /// <summary>
        /// Create new Task
        /// </summary>
        /// <param name="toDoItem"></param>
        /// <returns></returns>
        Task<ToDoItemDto> CreateToDoItemAsync(ToDoItemDto toDoItem);

        /// <summary>
        /// Complete the Task done
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task MarkAsDone(int id);

        /// <summary>
        /// Update the task
        /// </summary>
        /// <param name="id"></param>
        /// <param name="toDoItem"></param>
        /// <returns></returns>
        ToDoItem UpdateToDoItem(in int id, ToDoItem toDoItem);

        /// <summary>
        /// Delete the task
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteToDoItem(int id);

        /// <summary>
        /// Checks whether Task is already present or not
        /// </summary>
        /// <param name="toDoItem"></param>
        /// <returns></returns>
        bool IsToDoItemAlreadyExists(ToDoItemDto toDoItem);
    }
}
