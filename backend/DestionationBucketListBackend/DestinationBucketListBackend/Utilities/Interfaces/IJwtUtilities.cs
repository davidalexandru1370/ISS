using DestinationBucketListBackend.Model;

namespace DestinationBucketListBackend.Utilities.Interfaces;

public interface IJwtUtilities
{
    public string GenerateJwtToken(User user, int expiredTimeInMinutes);
    public Guid? ValidateJwtToken(string token);
    public string GetFieldFromToken(string token, string field);
    public DateTime GetExpirationDate(string token);
}