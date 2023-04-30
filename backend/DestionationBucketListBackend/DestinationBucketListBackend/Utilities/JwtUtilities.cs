using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DestinationBucketListBackend.ExtensionMethods;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace DestinationBucketListBackend.Utilities;

public class JwtUtilities : IJwtUtilities
{

    private string _secretKey = "FNJKDSAFIUEWSAFIUYQWE4UI34";
    public string GenerateJwtToken(User user, int expiredTimeInMinutes)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("Id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddMinutes(expiredTimeInMinutes),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
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
        var key = Encoding.ASCII.GetBytes(_secretKey);
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
}