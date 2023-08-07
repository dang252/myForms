namespace myforms_server.models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public string Token { get; set; }
        public string JwtId { get; set; }
        public bool isUsed { get; set; }
        public bool isRevoked { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}
