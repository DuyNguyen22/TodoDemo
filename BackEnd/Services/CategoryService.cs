using System.Collections.Generic;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetAll();
    }

    public class CategoryService : ICategoryService
    {
        private DataContext _context;

        public CategoryService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Category> GetAll()
        {
            return _context.Categories;
        }
    }
}