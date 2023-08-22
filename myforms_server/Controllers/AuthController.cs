using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using myforms_server.config;
using myforms_server.models;
using myforms_server.models.DTOs;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace Myforms.Controller.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class authController : ControllerBase
    {
        private readonly DataContext db;
        private readonly IConfiguration configuration;
        private readonly TokenValidationParameters validationParameters;
        public authController(DataContext Contextdata, IConfiguration configuration, TokenValidationParameters validationParameters)
        {
            db = Contextdata;
            this.configuration = configuration;
            this.validationParameters = validationParameters;
            //jwtConfig = Config;
        }

        private async Task<Tokens> GenerateToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(configuration.GetSection("JwtConfig:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                // claims
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.userId.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToUniversalTime().ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, user.Username),
                }),
                Expires = DateTime.UtcNow.Add(TimeSpan.Parse(configuration.GetSection("JwtConfig:ExpiryTimeFrame").Value)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var accessToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = new RefreshToken()
            {
                userId = user.userId,
                JwtId = token.Id,
                Token = GenerateRefrestToken(22),
                isUsed = false,
                isRevoked = false,
                AddedDate = DateTime.UtcNow,
                ExpireDate = DateTime.UtcNow.AddDays(7),
            };

            await db.RefreshTokens.AddAsync(refreshToken);
            await db.SaveChangesAsync();
            return new Tokens()
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
            };
        }
        private string GenerateRefrestToken(int length)
        {
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await db.Users.ToListAsync());
        }
        [HttpPost("register")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Register(RegisterDataDTO userInput)
        {
            var exist = db.Users.Any(user => user.Email == userInput.Email);
            if (exist)
            {
                return BadRequest("Email already taken");
            }
            exist = db.Users.Any(user => user.Username == userInput.Username);
            if (exist)
            {
                return BadRequest("Username already taken");
            }
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userInput.Password);
            //create User to save to database
            User user = new myforms_server.models.User()
            {
                Email = userInput.Email,
                Phonenumber = userInput.PhoneNumber,
                Dob = userInput.Dob,
                Username = userInput.Username,
                Gender = userInput.Gender,
                Password = passwordHash,
            };

            db.Users.Add(user);

            await db.SaveChangesAsync();

            Tokens Tokens = await GenerateToken(user);
            AuthResult result = new AuthResult()
            {
                userId = user.userId,
                Username = user.Username,
                Email = user.Email,
                AccessToken = Tokens.AccessToken,
                RefreshToken = Tokens.RefreshToken,
            };
            //Response.Cookies.Append("X-Refresh-Token", Tokens.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict, Expires = DateTime.Now.AddDays(7) });
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDataDTO userInput)
        {
            var account = db.Users.Where(u => (u.Username == userInput.Username || u.Email == userInput.Username)).SingleOrDefault();
            if (account == null)
            {
                return BadRequest("Can't find account");
            }
            else
            {
                Debug.WriteLine(account);
                bool checkPW = BCrypt.Net.BCrypt.Verify(userInput.Password, account.Password);
                if (!checkPW)
                {
                    return BadRequest("Wrong password");
                }
                else {
                    Tokens Tokens = await GenerateToken(account);
                    AuthResult result = new AuthResult()
                    {
                        userId = account.userId,
                        Username = account.Username,
                        Email = account.Email,
                        AccessToken = Tokens.AccessToken,
                        RefreshToken = Tokens.RefreshToken,
                    };
                    //Response.Cookies.Append("X-test", Tokens.RefreshToken, new CookieOptions() { HttpOnly = false, Expires = DateTime.Now.AddDays(7) });
                    //Response.Cookies.Append("X-Refresh-Token", Tokens.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict, Expires = DateTime.Now.AddDays(7) });
                    return Ok(result);
                }
            }

        }

        //private UnixTimeStampToDate(long Second)
        //{

        //}

        [HttpPost("refreshtoken")]
        public async Task<ActionResult<Tokens>> Refresh([FromBody] TokensDTO Tokens){
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            try
            {
                //Check1: check access token
                validationParameters.ValidateLifetime = false;
                var TokenInVerification = jwtTokenHandler.ValidateToken(Tokens.AccessToken, validationParameters, out var validatedToken);
                //check2: check access token expired or not
                var UtcExpireDate = long.Parse(TokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
                var UtcNow = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
                if (UtcExpireDate > UtcNow)
                {
                    return BadRequest("Access token not expired yet!");
                }
                //check3: refresh token exist 
                var CookieToken = HttpContext.Request.Cookies["refreshToken"];
                if (CookieToken == null)
                {
                    return BadRequest("Refresh Token is invalid");
                }
                var StoredToken = await db.RefreshTokens.FirstOrDefaultAsync(x => x.Token == CookieToken);
                if(StoredToken == null)
                {
                    return BadRequest("Refresh Token is invalid");
                }
                //check4: refresh token has been used/revoked?
                if (StoredToken.isUsed == true)
                {
                    return BadRequest("Refresh Token has been used");
                }
                if (StoredToken.isRevoked == true)
                {
                    return BadRequest("Refresh Token has been revoked");
                }
                //check5: Refresh token expired or not
                if(StoredToken.ExpireDate < DateTime.UtcNow)
                {
                    return BadRequest("Refresh Token expired");
                }
                //check6: jwtId in Refresh Token = access token id
                var jti = TokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                if (jti != StoredToken.JwtId)
                {
                    return BadRequest("Invalid Access Token or Refresh Token");
                }

                StoredToken.isUsed = true;
                StoredToken.isRevoked = true;
                db.Update(StoredToken);
                await db.SaveChangesAsync();

                var user = await db.Users.SingleOrDefaultAsync(user => user.userId == StoredToken.userId);
                //return
                Tokens NewTokens = await GenerateToken(user);
                AuthResult result = new AuthResult()
                {
                    userId = user.userId,
                    Username = user.Username,
                    Email = user.Email,
                    AccessToken = NewTokens.AccessToken,
                    RefreshToken = NewTokens.RefreshToken,
                };
                //Response.Cookies.Append("X-Refresh-Token", NewTokens.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict, Expires = DateTime.Now.AddDays(7) });
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest("Server Error");
            }
        }
        [HttpPost("oauth")]
        public async Task<ActionResult> Oauth(OauthDTO userInput)
        {
            Debug.WriteLine("User input", userInput);
            var account = db.Users.Where(u => (u.Email == userInput.Email)).SingleOrDefault();
            if (account == null)
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString());
                User user = new myforms_server.models.User()
                {
                    Email = userInput.Email,
                    Phonenumber = "0000000000",
                    Dob = DateTime.UtcNow,
                    Username = userInput.Username,
                    Gender = "Other",
                    Password = passwordHash,
                };

                await db.Users.AddAsync(user);

                await db.SaveChangesAsync();
            }

            //else if(account.Username != userInput.Username)
            //{
            //    return BadRequest("Email already taken");
            //}

            account = db.Users.Where(u => (u.Email == userInput.Email)).SingleOrDefault();
            Tokens Tokens = await GenerateToken(account);
            AuthResult result = new AuthResult()
            {
                userId = account.userId,
                Username = account.Username,
                Email = account.Email,
                AccessToken = Tokens.AccessToken,
                RefreshToken = Tokens.RefreshToken,
            };
            //Response.Cookies.Append("X-Refresh-Token", Tokens.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict, Expires = DateTime.Now.AddDays(7) });
            return Ok(result);

        }
        [HttpGet("logout")]
        public async Task<ActionResult> logout()
        {
            string header = Request.Headers.ToString();
            Debug.WriteLine(header);

            var CookieToken = HttpContext.Request.Cookies["refreshToken"];
            if (CookieToken == null)
            {
                Debug.WriteLine("no cookie");
                return BadRequest();
            }
            Debug.WriteLine(CookieToken);
            var StoredToken = await db.RefreshTokens.FirstOrDefaultAsync(x => x.Token == CookieToken);
            if (StoredToken == null)
            {
                Debug.WriteLine("cant find");
                return BadRequest();
            }
            else
            {
                Debug.WriteLine("OK");
                StoredToken.isRevoked = true;
                db.Update(StoredToken);
                await db.SaveChangesAsync();
                return Ok();
            }

        }
    }
}