using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDo.Domain.Interfaces;
using ToDo.Domain.Dto;
using Swashbuckle.AspNetCore.Annotations;
using ToDo.Domain.Entities;

namespace ToDoAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoService _toDoService;
        
        private readonly ILogger _logger;
        public ToDoController(IToDoService toDoService, ILogger<ToDoItem> logger)
        {
            _toDoService = toDoService;
            _logger = logger;
        }

        [HttpGet]
        [SwaggerOperation("Get ToDoList")]
        [SwaggerResponse(200, "Successfully loaded ToDo Item", typeof(ToDoItem))]
        public async Task<ActionResult<List<ToDoItem>>> Get(int status)
        {
            if (status < 1 || status > 3)
            {
                _logger.LogError("Invalid input parameters");
                return BadRequest("Invalid input parameters");
            }

            _logger.LogInformation("ToDoList method called");
            return await _toDoService.GetToDoList(status);
        }

        [HttpPost]
        [SwaggerOperation("Creates new User profile.")]
        [SwaggerResponse(200, "Successfully created ToDo Item", typeof(ToDoItem))]
        [SwaggerResponse(500, "Model validatation fails or unhandled error occured.", typeof(ToDoItem))]
        [SwaggerResponse(400, "Model data type mismatch might happen.", typeof(ToDoItem))]
        public async Task<ActionResult<ToDoItemDto>> Post([FromBody] ToDoItemDto toDoItem)
        {
            try
            {
                _logger.LogInformation("ToDoItem/Post method fired on {date}", DateTime.Now);
                if (toDoItem == null || !ModelState.IsValid || _toDoService.IsToDoItemAlreadyExists(toDoItem))
                    return BadRequest("Invalid ToDoItem");

                ToDoItemDto result = await _toDoService.CreateToDoItemAsync(toDoItem);
                return Created("/api/ToDoItem/{id}", result);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in ToDoItem/Post method : {e.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error saving data - " + e.Message);
            }
        }

        [HttpPost("MarkAsDone")]
        [SwaggerOperation("Complete the task.")]
        [SwaggerResponse(200, "Successfully updated ToDo Item", typeof(ToDoItem))]
        [SwaggerResponse(500, "Model validatation fails or unhandled error occured.", typeof(ToDoItem))]
        [SwaggerResponse(400, "Model data type mismatch might happen.", typeof(ToDoItem))]
        public async Task<ActionResult<int>> MarkAsDone(int id)
        {
            try
            {
                _logger.LogInformation("ToDoItem/Post method fired on {date}", DateTime.Now);

                await _toDoService.MarkAsDone(id);
                return Ok(StatusCode(200, id));
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in ToDoItem/Post method : {e.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error saving data - " + e.Message);
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation("Updates the ToDoItem.")]
        [SwaggerResponse(200, "Successfully updated ToDoItem", typeof(ToDoItem))]
        [SwaggerResponse(500, "Model validatation fails or unhandled error occured.", typeof(ToDoItem))]
        [SwaggerResponse(400, "Model data type mismatch might happen.", typeof(ToDoItem))]
        public ActionResult<ToDoItem> Put(int id, [FromBody] ToDoItem toDoItem)
        {
            try
            {
                if (toDoItem == null || !ModelState.IsValid)
                    return BadRequest("Invalid ToDoItem");

                _logger.LogInformation("ToDoItem/Put method fired on {date}", DateTime.Now);
                ToDoItem result = _toDoService.UpdateToDoItem(id, toDoItem);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in ToDoItem/Put method : {e.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error saving data - " + e.Message);
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation("Deletes ToDoItem (soft delete).")]
        [SwaggerResponse(200, "Successfully deleted ToDoItem", typeof(ToDoItem))]
        [SwaggerResponse(500, "Model validatation fails or unhandled error occured.", typeof(ToDoItem))]
        [SwaggerResponse(400, "Model data type mismatch might happen.", typeof(ToDoItem))]
        public IActionResult Delete(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid ToDoItem id");

                _logger.LogInformation("ToDoItem/Delete method fired on {date}", DateTime.Now);
                _toDoService.DeleteToDoItem(id);
                return Ok(StatusCode(200, id));
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in ToDoItem/Delete method : {e.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error in deleting data - " + e.Message);
            }

        }


    }
}
