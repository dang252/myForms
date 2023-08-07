using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace myforms_server.models
{
    public class User
    {
        public int userId { get; set; }
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;
        [StringLength(30)]
        public string? Email { get; set; }
        [StringLength(80)]
        public string Password { get; set; } = string.Empty;
        [StringLength(15)]
        public string? Phonenumber { get; set; }
        public DateTime Dob { get; set; }
        [StringLength(10)]
        public string? Gender { get; set; }
    }
}
