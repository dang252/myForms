using System.ComponentModel.DataAnnotations;

namespace myforms_server.models
{
    public class AuthResult
    {
        public int userId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } 
        public Tokens Tokens { get; set; }
    }
}
