using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Data.Context;
using ToDo.Domain.Dto;
using ToDo.Domain.Entities;
using ToDo.Domain.Interfaces.RepositoryInterface;

namespace ToDo.Data.Repository
{
    public class ToDoItemRepository : IToDoItemRepostory
    {
        private readonly ToDoItemContext _toDoItemContext;

        public ToDoItemRepository(ToDoItemContext schoolContext)
        {
            _toDoItemContext = schoolContext;
        }

        public async Task<IEnumerable<ToDoItem>> GetAllToDoItemsAsync()
        {
            var query = "SELECT Id, ItemName, ItemDays FROM ToDoItem";
            using var con = _toDoItemContext.CreateConnection();
            var toDoItems = await con.QueryAsync<ToDoItem>(query);
            return toDoItems.ToList();
        }

        public async Task<ToDoItemDto> InsertAsync(ToDoItemDto toDoItem)
        {
            var query = "INSERT INTO ToDoItem (ItemName, Deadline, IsDone, IsActive) " +
                        "VALUES (@ItemName, @Deadline, @IsDone, @IsActive) " +
                        "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("ItemName", toDoItem.ItemName, DbType.String);
            parameters.Add("Deadline", toDoItem.Deadline, DbType.Date);
            parameters.Add("IsDone", false, DbType.Boolean);
            parameters.Add("IsActive", true, DbType.Boolean);

            using var connection = this._toDoItemContext.CreateConnection();

            try
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);
            }
            catch(Exception e)
            {
                string s = "";
            }
            

            var toDoItemDto = new ToDoItemDto
            {
                Id = 0,
                ItemName = toDoItem.ItemName,
                Deadline = toDoItem.Deadline,
                IsDone = toDoItem.IsDone
            };

            return toDoItemDto;
        }

    }
}
