using System.ComponentModel.DataAnnotations;

namespace myforms_server.models
{
    public class Tokens
    {
        [Required]
        public string AccessToken { set; get; }
        [Required]
        public string RefreshToken { set; get; }

    }
}
