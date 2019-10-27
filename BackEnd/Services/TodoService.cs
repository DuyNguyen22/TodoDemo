using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface ITodoService
    {
        IEnumerable<Todo> GetAll();
        IEnumerable<Todo> GetByUser(int userId);
        Todo GetById(int id);
        Todo Create(Todo todo);
        void Update(Todo todoParam);
        void Delete(int id);
        void MarkCompleted(int id);
    }

    public class TodoService : ITodoService
    {
        private DataContext _context;

        public TodoService(DataContext context)
        {
            _context = context;
        }

        public Todo Create(Todo todo)
        {
            CheckTodo(todo);
            _context.Todos.Add(todo);
            _context.SaveChanges();
            return todo;
        }

        public void Delete(int id)
        {
            var todo = _context.Todos.Find(id);
            if (todo != null)
            {
                _context.Todos.Remove(todo);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Todo> GetAll()
        {
            return _context.Todos.Include(x => x.Category);
        }

        public Todo GetById(int id)
        {
            return _context.Todos.Find(id);
        }

        public IEnumerable<Todo> GetByUser(int userId)
        {
            return _context.Todos
                .Include(x => x.TodoTags)
                .Include("TodoTags.Tag")
                .Include(x => x.Category)
                .Where(x => x.CreatedBy == userId);
        }

        public void MarkCompleted(int id)
        {
            var todo = _context.Todos.Find(id);

            if (todo == null)
                throw new AppException($"Todo {id} not found ");

            todo.IsCompleted = true;
            _context.Todos.Update(todo);
            _context.SaveChanges();
        }

        public void Update(Todo todoParam)
        {
            CheckTodo(todoParam);
            var todo = _context.Todos.Find(todoParam.Id);

            if (todo == null)
                throw new AppException($"Todo {todoParam.Id} not found ");

            todo.Title = todoParam.Title;
            todo.Description = todoParam.Description;
            todo.IsCompleted = todoParam.IsCompleted;

            _context.Todos.Update(todo);
            _context.SaveChanges();
        }

        private void CheckTodo(Todo todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Title))
                throw new ArgumentException("Todo title could not be empty.");
        }
    }
}