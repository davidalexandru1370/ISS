using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DestionationBucketListBackend.Model;
using DestionationBucketListBackend.Utilities.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace DestionationBucketListBackend.Utilities;

public class JwtUtilities : IJwtUtilities
{
    public string GenerateJwtToken(User user, int expiredTimeInMinutes)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("FNJKDSAFIUEWSAFIUYQWE4UI34");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("Id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddMinutes(expiredTimeInMinutes),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}