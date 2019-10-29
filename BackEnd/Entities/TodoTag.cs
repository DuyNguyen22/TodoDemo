using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class TodoTag
    {
        public int TodoId { get; set; }
        public string Tag { get; set; }
        public virtual Todo Todo { get; set; }
    }
}