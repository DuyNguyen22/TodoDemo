using System.Collections.Generic;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface ITagService
    {
        IEnumerable<Tag> GetAll();
    }

    public class TagService : ITagService
    {
        private readonly DataContext _context;

        public TagService(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<Tag> GetAll()
        {
            return _context.Tags;
        }
    }
}