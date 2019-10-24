using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Users
{
    public class UpdateUserProfileModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime Birthdate { get; set; }

        // [Required]
        // public string Password { get; set; }
    }
}