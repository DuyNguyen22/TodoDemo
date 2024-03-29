using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Users
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public DateTime Birthdate { get; set; }
        public bool IsBlocked { get; set; }
    }
}