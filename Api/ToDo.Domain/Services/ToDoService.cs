using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Domain.Dto;
using ToDo.Domain.Entities;
using ToDo.Domain.Interfaces;
using ToDo.Domain.Interfaces.RepositoryInterface;

namespace ToDo.Domain.Services
{
    public class ToDoService : IToDoService
    {
        private readonly ILogger _logger;
        private readonly IToDoItemRepostory _toDoItemRepostory;

        public ToDoService(ILogger logger, IToDoItemRepostory toDoItemRepostory)
        {
            _logger = logger;
            _toDoItemRepostory = toDoItemRepostory;
        }

        /// <summary>
        /// Loads all the Todo items
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public async Task<List<ToDoItem>> GetToDoList(int status)
        {
            return (List<ToDoItem>)await _toDoItemRepostory.GetAllToDoItemsAsync(status);
        }

        /// <summary>
        /// Create new Task
        /// </summary>
        /// <param name="toDoItem"></param>
        /// <returns></returns>
        public async Task<ToDoItemDto> CreateToDoItemAsync(ToDoItemDto toDoItem)
        {
            return await _toDoItemRepostory.InsertAsync(toDoItem);
        }

        /// <summary>
        /// Complete the Task done
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task MarkAsDone(int id)
        {
            await _toDoItemRepostory.MarkAsDone(id);
        }

        /// <summary>
        /// Update the task
        /// </summary>
        /// <param name="id"></param>
        /// <param name="toDoItem"></param>
        /// <returns></returns>
        public ToDoItem UpdateToDoItem(in int id, ToDoItem toDoItem)
        {
            return null;
        }

        /// <summary>
        /// Delete the task
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteToDoItem(int id)
        {
            await _toDoItemRepostory.DeleteTask(id);
        }

        /// <summary>
        /// Checks whether Task is already present or not
        /// </summary>
        /// <param name="toDoItem"></param>
        /// <returns></returns>
        public bool IsToDoItemAlreadyExists(ToDoItemDto toDoItem)
        {
            return false;
        }

    }
}
