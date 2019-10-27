using System.Collections.Generic;
using WebApi.Models.Tags;

namespace WebApi.Models.Users
{
    public class TodoModel
    {
        public TodoModel()
        {
            Tags = new List<TagModel>();
        }
        
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public bool IsCompleted { get; set; }
        public int CategoryId { get; set; }
        public string CategoryBackgroundColor { get; set; }
        public List<TagModel> Tags { get; set; }
    }
}