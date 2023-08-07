using System.ComponentModel.DataAnnotations;

namespace myforms_server.models.DTOs
{
    public class UserReturnDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public DateTime Dob { get; set; }
        [Required]
        public string? Gender { get; set; }
    }
}
