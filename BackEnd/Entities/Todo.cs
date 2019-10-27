using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class Todo
    {
        public Todo()
        {
            TodoTags = new List<TodoTag>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsCompleted { get; set; }

        public int CreatedBy { get; set; }
        [ForeignKey("CreatedBy")]
        public User User { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        // [ForeignKey("TodoId")]
        public virtual ICollection<TodoTag> TodoTags { get; set; }
    }
}