using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models.Users;
using System.Linq;
using WebApi.Models.Todos;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private ITodoService _todoService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public TodosController(
            ITodoService todoService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _todoService = todoService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            var todos = _todoService.GetByUser(id);
            var model = _mapper.Map<IList<TodoModel>>(todos);
            return Ok(model);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var userId = Convert.ToInt32(this.User.Identity.Name);
            var todos = _todoService.GetByUser(userId);
            // .GetAll().Where(x => x.CreatedBy == userId);
            var model = _mapper.Map<IList<TodoModel>>(todos).ToList();
            // foreach (var todo in todos.Where(x => x.TodoTags != null && x.TodoTags.Any()))
            // {
            //     var todoModel = model.First(x => x.Id == todo.Id);
            //     todoModel.Tags.AddRange(todo.TodoTags.Select(x => _mapper.Map<TagModel>(x.Tag)));
            // }
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var todo = _todoService.GetById(id);
            var model = _mapper.Map<UserModel>(todo);
            return Ok(model);
        }

        [HttpPut()]
        public IActionResult Update([FromBody]TodoModel model)
        {
            // map model to entity and set id
            var todo = _mapper.Map<Todo>(model);
            //todo.Id = id;
            if (model.Tags != null && model.Tags.Any())
            {
                model.Tags.ForEach(tag => todo.TodoTags.Add(new TodoTag { TodoId = todo.Id, Tag = tag }));
            }
            try
            {
                // update user 
                _todoService.Update(todo);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _todoService.GetById(id);
            if (todo == null)
                return NotFound("Todo not exist");
            if (todo.CreatedBy != Convert.ToInt32(User.Identity.Name))
                return Forbid("You can only remove your todo");
            _todoService.Delete(id);
            return Ok();
        }

        [HttpPost]
        public IActionResult Create([FromBody]TodoModel model)
        {
            // map model to entity
            var todo = _mapper.Map<Todo>(model);
            try
            {
                if (model.Tags != null && model.Tags.Any())
                {
                    foreach (var tag in model.Tags)
                    {
                        todo.TodoTags.Add(new TodoTag { Todo = todo, Tag = tag });
                    }
                }
                // create user
                todo.CreatedDate = DateTime.Now;
                todo.CreatedBy = Convert.ToInt32(User.Identity.Name);
                var result = _todoService.Create(todo);
                return Ok(_mapper.Map<TodoModel>(result));
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("markcompleted/{id}")]
        public IActionResult MarkCompleted(int id)
        {
            var todo = _todoService.GetById(id);
            if (todo == null)
                return NotFound("Todo not exist");
            if (todo.CreatedBy != Convert.ToInt32(User.Identity.Name))
                return Forbid("You can only complete your todo");
            _todoService.MarkCompleted(id);
            return Ok();
        }
    }
}
