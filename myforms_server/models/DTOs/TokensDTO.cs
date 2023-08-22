using System.ComponentModel.DataAnnotations;

namespace myforms_server.models.DTOs
{
    public class TokensDTO
    {
        [Required]
        public string AccessToken { get; set; }
    }
}
