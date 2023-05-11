using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DestinationBucketListBackend.ExtensionMethods;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Settings;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DestinationBucketListBackend.Utilities;

public class JwtUtilities : IJwtUtilities
{
    private IOptions<AppSettings> _appSettings;

    public JwtUtilities(IOptions<AppSettings> appSettings)
    {
        _appSettings = appSettings;
    }

    public string GenerateJwtToken(User user, int expiredTimeInMinutes)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }
            ),
            Expires = DateTime.UtcNow.AddMinutes(expiredTimeInMinutes),
            Audience = "localhost:3000",
            Issuer = "localhost:5041",
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    public Guid? ValidateJwtToken(string token)
    {
        if (token == null)
        {
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "Id").Value);

            return userId;
        }
        catch (Exception)
        {
        }

        return null;
    }

    public string GetFieldFromToken(string token, string field)
    {
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadJwtToken(token);

        var tokens = jsonToken as JwtSecurityToken;

        return tokens.Claims.First(x => x.Type == field).Value;
    }

    public DateTime GetExpirationDate(string token)
    {
        int amount = Int32.Parse(GetFieldFromToken(token, "exp"));
        DateTime result = new DateTime().ConvertFromUnixTimeStamp(amount);
        return result;
        //return Utilities.ConvertFromUnixTimeStamp(Int32.Parse(GetFieldFromToken(token, "exp")));
    }

    public DateTime GetIssuedDate(string token)
    {
        int amount = Int32.Parse(GetFieldFromToken(token, "iat"));
        DateTime result = new DateTime().ConvertFromUnixTimeStamp(amount);
        return result;
    }
}