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

        public async Task<IEnumerable<ToDoItem>> GetAllToDoItemsAsync(int status)
        {
            var query = "SELECT [Id], [ItemName], [Deadline], [IsDone] " +
                          "FROM[Practice].[dbo].[ToDoItem] " +
                          "where IsActive = 1 AND IsDone = " +
                          "CASE @IsDoneVal " +
                          "   WHEN 1 THEN 1 " +
                          "  WHEN 2 THEN 0 " +
                          " ELSE IsDone " +
                          "END ";

            var parameters = new DynamicParameters();
            parameters.Add("IsDoneVal", status, DbType.Int32);
            using var con = _toDoItemContext.CreateConnection();
            var toDoItems = await con.QueryAsync<ToDoItem>(query, parameters);
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

            var id = await connection.QuerySingleAsync<int>(query, parameters);

            var toDoItemDto = new ToDoItemDto
            {
                Id = id,
                ItemName = toDoItem.ItemName,
                Deadline = toDoItem.Deadline,
                IsDone = toDoItem.IsDone
            };

            return toDoItemDto;
        }

        public async Task MarkAsDone(int taskId)
        {
            var query = "UPDATE ToDoItem SET IsDone = 1 " +
                        "WHERE Id = @Id ";

            var parameters = new DynamicParameters();
            parameters.Add("Id", taskId, DbType.Int32);

            using var connection = this._toDoItemContext.CreateConnection();
            await connection.QueryAsync<int>(query, parameters);
        }

        public async Task DeleteTask(int taskId)
        {
            var query = "UPDATE ToDoItem SET IsActive = 0 " +
                        "WHERE Id = @Id ";

            var parameters = new DynamicParameters();
            parameters.Add("Id", taskId, DbType.Int32);

            using var connection = this._toDoItemContext.CreateConnection();
            await connection.QueryAsync<int>(query, parameters);
        }
    }
}
