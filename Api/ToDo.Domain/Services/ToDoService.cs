﻿using Microsoft.Extensions.Logging;
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

        public async Task<List<ToDoItem>> GetToDoList(int status)
        {
            return (List<ToDoItem>)await _toDoItemRepostory.GetAllToDoItemsAsync();
        }

        public async Task<ToDoItemDto> CreateToDoItemAsync(ToDoItemDto toDoItem)
        {
            return await _toDoItemRepostory.InsertAsync(toDoItem);
        }

        public ToDoItem UpdateToDoItem(in int id, ToDoItem toDoItem)
        {
            return null;
        }

        public void DeleteToDoItem(in int id)
        {

        }

        public bool IsToDoItemAlreadyExists(ToDoItemDto toDoItem)
        {
            return false;
        }

    }
}