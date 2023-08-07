using System.ComponentModel.DataAnnotations;

namespace myforms_server.models.DTOs
{
    public class LoginDataDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
