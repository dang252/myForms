using System.ComponentModel.DataAnnotations;

namespace myforms_server.models.DTOs
{
    public class OauthDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
